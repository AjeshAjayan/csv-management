import mongoose from "mongoose";
import Papa from "papaparse";
import { ProductMetrics } from "../models/ProductsMetrices.js";
import { Products } from "../models/Products.js";
const BATCH_SIZE = 1000;

(async () => {
    try {

        let rowCount = 0;
        let totalPrice = 0;
        let rows = [];

        /**
        * use transaction to handle bulk insertion
        * insertion is handled tp small chunk to prevent memory issues
        * startTransaction can be used to perform rollback, in case of error
        */
        const session = await mongoose.startSession();
        session.startTransaction();

        Papa.parse(process.stdin, {
            header: true,
            skipEmptyLines: true,
            step: async (row) => {
                console.log(row);
                /**
                 * validate if data exist
                */
                if (!row?.data?.productName || !row?.data?.SKU || !row?.data?.price || !row?.data?.description) {
                    console.error(`Missing required fields at row ${rowCount}`);
                    await session.abortTransaction();
                    process.exit(1);
                }

                /**
                 * keeps track of row count and price to save to ProductMetrics collection
                 * saving to separate collection to overcome performance issues when fetching
                 * count from product collection
                */
                rowCount++;
                totalPrice += (row?.data?.price ?? 0);

                // batch insert by chunks to improve performance and scalability
                rows.push(row.data);
                if (rowCount % BATCH_SIZE === 0) {
                    Products.insertMany(rows, { session });
                    rows = [];
                }
            },
            complete: async () => {
                try {
                    console.log("Parsing complete.");
                    // write row count
                    // write total price
                    const count = await ProductMetrics.countDocuments();
                    if (count >= 1) {
                        const updatedRoot = await Root.findOneAndUpdate(
                            { _id: "root" },
                            {
                                $set: {
                                    totalNumberOfProducts: rowCount,
                                    totalWorthOfProduct: totalPrice,
                                },
                            },
                            { new: true }
                        );
                    } else {
                        await ProductMetrics.create(
                            {
                                totalNumberOfProducts: rowCount,
                                totalWorthOfProduct: totalPrice
                            },
                            { session }
                        );
                    }
                    session.endSession();
                    process.exit(0);
                } catch (err) {
                    await session.abortTransaction();
                    process.exit(1);
                }
            },
            error: async (err) => {
                console.error("Error during parsing:", err);
                await session.abortTransaction();
                process.exit(1);
            },
        });
    } catch (err) {
        console.error("Error starting worker:", err);
        process.exit(1);
    }
})()
