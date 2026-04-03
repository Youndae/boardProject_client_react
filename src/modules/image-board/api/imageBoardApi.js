import { axiosEnhanced } from "../../../common/utils/axios/axiosEnhanced";

const BASE_URL = 'image-board';

export const imageBoardApi = {
    getList: (queryString) =>
        axiosEnhanced.get(`${BASE_URL}${queryString}`),
    getDetail: (imageId) =>
        axiosEnhanced.get(`${BASE_URL}/${imageId}`),
    deleteBoard: (imageId) =>
        axiosEnhanced.delete(`${BASE_URL}/${imageId}`),
    postBoard: (body) =>
        axiosEnhanced.post(
            `${BASE_URL}`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ),
    getPatchDetail: (imageId) =>
        axiosEnhanced.get(`${BASE_URL}/patch/detail/${imageId}`),
    patchBoard: (imageId, body) =>
        axiosEnhanced.patch(
            `${BASE_URL}/${imageId}`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
}