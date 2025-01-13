import { Product } from "../models/Products"
import { Response } from "../models/Response"
import { axiosInstance } from "./axios"

export const dashboardInsightAPI = async (): Promise<Response<{
    last5Products: Product[],
    totalProducts: number,
    totalPrice: number
}>> => {
    const response = await axiosInstance.get<Response<{
        last5Products: Product[],
        totalProducts: number,
        totalPrice: number
    }>>(
        `v1/products/dashboard`
    );

    return response.data;
}
