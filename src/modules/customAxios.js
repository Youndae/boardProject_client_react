import axios  from 'axios';

const default_url = process.env.REACT_APP_API_URL;

export const customAxios = axios.create({
    baseURL: `${default_url}`,
    headers: {
        'Content-Type' : 'application/json',
    },
    withCredentials: true,
});