import { Products } from "../models/Products.js";
import { ProductMetrics } from "../models/ProductsMetrices.js";
import { generateResponseFormat } from "../utils/generateResponseFormat.js";

export const getProductsController = async (req, res) => {
    const { limit, page, sort, search } = req.query;

    const filter = {};

    if (search) {
        filter.$or = [
            { productName: { $regex: search.trim(), $options: 'i' } },
            { SKU: { $regex: search.trim(), $options: 'i' } },
        ];
    }

    const products = await Products.find(filter)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort(sort);

    /**
     * fetching total count from ProductMetrics; 
     * this will be effect when product collection have 
     * millions of products
     */
    let totalCount = 0;
    if(search) {
        totalCount = await ProductMetrics.countDocuments(filter);
    } else {
        const metrics = await ProductMetrics.find().limit(1);
        totalCount = metrics?.[0]?.totalNumberOfProducts ?? 0;
    }

    res.status(200).send(
        generateResponseFormat(
            'Products fetched successfully',
            200,
            'success',
            {
                products,
                total: totalCount
            },
        )
    )
}
