import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    productName: { type: 'string', required: true },
    SKU: { type: 'string', required: true },
    price: { type: 'number', required: true },
    description: { type: 'string', required: true },
    createdAt: { type: Date, default: Date.now },
});

ProductsSchema.clearIndexes({ price: 1 }, { background: true });
ProductsSchema.clearIndexes({ createdAt: 1 }, { background: true });
ProductsSchema.clearIndexes({ productName: 1 }, { background: true });

export const Products = mongoose.model('Products', ProductsSchema);
