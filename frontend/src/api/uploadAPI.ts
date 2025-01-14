import { axiosInstance } from "./axios";
import { Response } from "../models/Response";

export const uploadAPI = async (file: any): Promise<Response<null>> => {
    try {
        const response = await axiosInstance.post('v1/csv/upload', file, {
            headers: {
                "Content-Type": "application/octet-stream"
            },
        });

        return response.data;
    } catch (e) {
        throw e;
    }
}
