import axios  from 'axios';

const default_url = process.env.REACT_APP_API_URL;
const image_default = process.env.REACT_APP_API_IMAGE;
export const customAxios = axios.create({
    baseURL: `${default_url}`,
    headers: {
        'Content-Type' : 'application/json',
    },
    withCredentials: true,
});

export const customImageAxios = axios.create({
    baseURL: `${default_url}${image_default}`,
    headers: {
        'Content-Type' : 'application/json',
    },
    withCredentials: true,
    responseType: 'blob',
})

export const customImageInsertAxios = axios.create({
    baseURL: `${default_url}${image_default}`,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
});