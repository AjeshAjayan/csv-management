import mongoose from "mongoose";
import { ProductMetrics } from "../models/ProductsMetrices.js";
import { connectToDatabase } from "../utils/connectToDb.js";
import { Products } from "../models/Products.js";
import csvParser from 'csv-parser';

const BATCH_SIZE = 10000;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

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

        let totalPrice = 0;
        let totalSize = 0;
        let rowCount = 0;
        let rows = [];
        /**
         * processing CSV is asynchronous; so it is pushed to processCSVPromise
         * and awaited in "on end" to make sure "on data" is completed before "on end"
         */
        const processCSVPromise = []

        /**
         * processing of CSV file is handled as a background task
         * so, keep status in a document, and is not part of the transaction
         */
        await ProductMetrics.findOneAndUpdate(
            { _id: "root" },
            {
                parsingInProgress: true,
                uploadStatus: 'pending',
            },
            { upsert: true, new: true }
        );

        /**
         * handle file size validation
         */
        process.stdin.on('data', async (chunk) => {
            totalSize += chunk.length

            if(totalSize > MAX_FILE_SIZE) {
                console.error("File size exceeds the limit of 5MB");
                session.abortTransaction();

                await ProductMetrics.findOneAndUpdate(
                    { _id: "root" },
                    {
                        parsingInProgress: false,
                        uploadStatus: 'size_too_large',
                    },
                    { upsert: true, new: true }
                );
                
                process.stdin.end();
                session.endSession();
                process.exit(1);
            }
        })

        process.stdin.pipe(csvParser()).on('data', async (row) => {
            const processCSV = async () => {
                try {
    
                    /**
                     * total number of rows and total worth of product is kept separately.
                     * So that it can be fetched efficiently. especially when product collection
                     * have millions of records 
                     */
    
                    // Add to batch
                    if (row.productName && row.SKU && row.price && row.description) {
                        rows.push({
                            productName: row.productName,
                            SKU: row.SKU,
                            price: parseFloat(row.price),
                            description: row.description,
                        });
    
                        rowCount++;
                        totalPrice += parseFloat(row.price) || 0;
                    }
    
                    if (rowCount % BATCH_SIZE === 0) {
                        // batch insertion
                        await Products.insertMany(rows, { session });
                        rows = [];
                    }
                } catch (err) {
                    console.error("Error processing row:", err.message);
                    await ProductMetrics.findOneAndUpdate(
                        { _id: "root" },
                        {
                            parsingInProgress: false,
                            uploadStatus: 'failed',
                        },
                        { upsert: true, new: true }
                    );
                    await session.abortTransaction();
                    process.exit(1);
                }
            }

            processCSVPromise.push(processCSV());
        }).on('end', async () => {
            try {
                await Promise.all(processCSVPromise);
                console.log("On data completed");

                if (rows.length > 0) {
                    // batch insertion
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
                        parsingInProgress: false,
                        uploadStatus: 'completed',
                    },
                    { upsert: true, session, new: true }
                );
                console.log("Total rows inserted:", res.totalNumberOfProducts);

            } catch (err) {
                console.error("Error during final processing:", err.message);
                await ProductMetrics.findOneAndUpdate(
                    { _id: "root" },
                    {
                        parsingInProgress: false,
                        uploadStatus: 'failed',
                    },
                    { upsert: true, new: true }
                );
                await session.abortTransaction();
                process.exit(1);
            } finally {
                await session.commitTransaction();
                session.endSession();
                mongoose.disconnect();
                console.log("Transaction committed.");
            }
        })
    } catch (err) {
        console.error("Error initializing worker:", err.message);
        await ProductMetrics.findOneAndUpdate(
            { _id: "root" },
            {
                parsingInProgress: false,
                uploadStatus: 'failed',
            },
            { upsert: true, new: true }
        );
        process.exit(1);
    }
})();
