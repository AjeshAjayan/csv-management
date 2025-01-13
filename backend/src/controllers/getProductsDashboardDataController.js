import { Products } from "../models/Products.js"
import { ProductMetrics } from "../models/ProductsMetrices.js";
import { generateResponseFormat } from "../utils/generateResponseFormat.js";

export const getProductsDashboardDataController = async (req, res) => {
    const last5 = await Products.find()
        .limit(5)
        .sort({ createdAt: -1 })

    const metrics = await ProductMetrics.find().limit(1);
    const totalCount = metrics?.[0]?.totalNumberOfProducts ?? 0;
    const totalPrice = metrics?.[0]?.totalWorthOfProduct ?? 0;

    res.status(200).send(
        generateResponseFormat(
            'Success',
            200,
            'success',
            {
                last5Products: last5,
                totalProducts: totalCount,
                totalPrice: totalPrice
            }
        )
    )
}
