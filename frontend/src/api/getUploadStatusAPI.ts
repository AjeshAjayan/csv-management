import { Response } from "../models/Response"
import { axiosInstance } from "./axios"

export const getUploadStatusAPI = async () => {
    const response = await axiosInstance.get<Promise<Response<any>>>('v1/products/upload-status');

    return response.data;
}
