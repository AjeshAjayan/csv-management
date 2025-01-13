import mongoose from "mongoose";

const ProductMetricsSchema = new mongoose.Schema({
    _id: { type: String, default: "root" },
    totalNumberOfProducts: { type: 'number', required: true },
    totalWorthOfProduct: { type: 'number', required: true },
    parsingInProgress: { type: 'boolean', default: false },
    uploadStatus: { type: 'string', default: '' },
}) 

export const ProductMetrics = mongoose.model('ProductMetrics', ProductMetricsSchema);
