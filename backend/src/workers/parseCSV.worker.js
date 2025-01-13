import mongoose from "mongoose";
import Papa from "papaparse";
import { ProductMetrics } from "../models/ProductsMetrices.js";
import { connectToDatabase } from "../utils/connectToDb.js";
import { Products } from "../models/Products.js";

const BATCH_SIZE = 1000;

(async () => {
    try {
        await connectToDatabase();

        /**
         * insertMany is used to insert the products. Total product is split into
         * {BATCH_SIZE} and each batch is inserted separately
         * 
         * Transaction used used to handle rollback of any batch fails
         */
        const session = await mongoose.startSession();
        await session.startTransaction();

        let rowCount = 0;
        let totalPrice = 0;
        let rows = [];


        process.stdin.on("data", (chunk) => {
            console.log('chunk', chunk);
            Papa.parse(chunk.toString(), {
                header: true,
                skipEmptyLines: true,
                step: async (row) => {
                    try {

                        /**
                         * validate, if any data is missing
                         * 
                         * validate is done in FE as well
                         */
                        const data = row.data;
                        if (!data.productName || !data.SKU || !data.price || !data.description) {
                            throw new Error(`Missing required fields at row ${rowCount}`);
                        }

                        /**
                         * total number of rows and total worth of product is kept separately.
                         * So that it can be fetched efficiently. especially when product collection
                         * have millions of records 
                         */
                        rowCount++;
                        totalPrice += parseFloat(data.price) || 0;

                        // Add to batch
                        rows.push({
                            productName: data.productName,
                            SKU: data.SKU,
                            price: parseFloat(data.price),
                            description: data.description,
                        });

                        // batch insertion
                        if (rows.length >= BATCH_SIZE) {
                            await Products.insertMany(rows, { session });
                            rows = [];
                        }
                    } catch (err) {
                        console.error("Error processing row:", err.message);
                        await session.abortTransaction();
                        process.exit(1);
                    }
                },
                complete: async () => {
                    try {
                        // Insert remaining rows in batch
                        if (rows.length > 0) {
                            await Products.insertMany(rows, { session });
                        }

                        // insert total number of rows and total worth of product;
                        const res = await ProductMetrics.findOneAndUpdate(
                            { _id: "root" },
                            {
                                $inc: { 
                                    totalNumberOfProducts: rowCount,
                                    totalWorthOfProduct: totalPrice
                                },
                            },
                            { upsert: true, session, new: true }
                        );
                        console.log("Total rows inserted:", res.totalNumberOfProducts);

                        await session.commitTransaction();
                        console.log("Transaction committed.");
                    } catch (err) {
                        console.error("Error during final processing:", err.message);
                        await session.abortTransaction();
                        process.exit(1);
                    } finally {
                        session.endSession();
                        mongoose.disconnect();
                        process.exit(0);
                    }
                },
                error: async (err) => {
                    console.error("Parsing error:", err.message);
                    await session.abortTransaction();
                    process.exit(1);
                },
            });
        });
    } catch (err) {
        console.error("Error initializing worker:", err.message);
        process.exit(1);
    }
})();
