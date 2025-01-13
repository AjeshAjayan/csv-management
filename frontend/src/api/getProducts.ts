import { ProductsResponse } from "../models/ProductsResponse"
import { Response } from "../models/Response"
import { axiosInstance } from "./axios"

export const getProducts = async (
    limit: number, 
    page: number, 
    sort: string,
    search: string = '',
): Promise<Response<ProductsResponse>> => {
    const response = await axiosInstance.get<Response<ProductsResponse>>(
        `v1/products?limit=${limit}&page=${page}&sort=${sort}&search=${search}`
    );

    return response.data;
}
