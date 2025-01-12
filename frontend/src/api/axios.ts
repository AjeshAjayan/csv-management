import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 1000,
});

axiosInstance.interceptors.request.use(function (config) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
}, function (error) {
    return Promise.reject(error);
});
