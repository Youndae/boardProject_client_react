import { axiosEnhanced } from "../../../common/utils/axios/axiosEnhanced";

const BASE_URL = 'board';

export const boardApi = {
    getList: (queryString) =>
        axiosEnhanced.get(`${BASE_URL}${queryString}`),
    getDetail: (boardId) =>
        axiosEnhanced.get(`${BASE_URL}/${boardId}`),
    deleteBoard: (boardId) =>
        axiosEnhanced.delete(`${BASE_URL}/${boardId}`),
    postBoard: (body) =>
        axiosEnhanced.post(`${BASE_URL}`, body),
    getPatchDetail: (boardId) =>
        axiosEnhanced.get(`${BASE_URL}/patch/${boardId}`),
    patchBoard: (boardId, body) =>
        axiosEnhanced.patch(`${BASE_URL}/${boardId}`, body),
    getReplyData: (boardId) =>
        axiosEnhanced.get(`${BASE_URL}/reply/${boardId}`),
    postReply: (boardId, body) =>
        axiosEnhanced.post(`${BASE_URL}/reply/${boardId}`, body)
}