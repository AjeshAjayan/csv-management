import { LoginResponse } from "../models/LoginResponse";
import { Response } from "../models/Response";
import { axiosInstance } from "./axios"

export const loginAPI = async (
    email: string,
    password: string,
): Promise<Response<LoginResponse>> => {
    try {
        const response = await axiosInstance.post<Response<LoginResponse>>(
            'v1/auth/login', 
            { email, password }
        );

        if(response.status === 200) {
            localStorage.setItem('token', response.data.data.token);
        }

        return response.data
    } catch (err: any) {
        throw err.response.data;
    }
}
