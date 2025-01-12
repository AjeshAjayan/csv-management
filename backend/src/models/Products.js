import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    productName: { type: 'string', required: true },
    SKU: { type: 'string', required: true },
    price: { type: 'number', required: true },
    description: { type: 'string', required: true },
}) 

export const Products = mongoose.model('Products', ProductsSchema);
