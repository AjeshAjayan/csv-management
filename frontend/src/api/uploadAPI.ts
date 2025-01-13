import { axiosInstance } from "./axios";
import { Response } from "../models/Response";

export const uploadAPI = async (formData: any): Promise<Response<null>> => {
    try {
        const response = await axiosInstance.post('v1/csv/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (e) {
        throw e;
    }
}
