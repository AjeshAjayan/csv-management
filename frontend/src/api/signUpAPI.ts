import { Response } from "../models/Response";
import { axiosInstance } from "./axios"

export const signUpAPI = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
): Promise<Response<any>> => {
    try {
        const response = await axiosInstance.post<Response<any>>(
            'v1/auth/signup', 
            { email, password, firstName, lastName }
        );

        if(response.status === 200) {
            localStorage.setItem('token', response.data.data.token);
        }

        return response.data
    } catch (err: any) {
        throw err.response.data;
    }
}
