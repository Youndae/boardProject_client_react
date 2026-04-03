import axios from 'axios'
import { responseInterceptor } from "./axiosInterceptor";

// 4xx, 5xx handling Interceptor를 포함한 axios
export const axiosEnhanced = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

axiosEnhanced.interceptors.response.use(
    res => res,
    responseInterceptor
)