import axios from 'axios';

// response handling을 직접 제어해야 하는 기능용 axios
export const axiosSimple = axios.create({
    baseURL: '/api',
    withCredentials: true,
});