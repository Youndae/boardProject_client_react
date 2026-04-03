import { axiosEnhanced } from "../../../common/utils/axios/axiosEnhanced";

const BASE_URL = 'comment';

export const commentApi = {
    getBoardCommentList: (queryString) =>
        axiosEnhanced.get(`${BASE_URL}/board${queryString}`),
    getImageBoardCommentList: (queryString) =>
        axiosEnhanced.get(`${BASE_URL}/image-board${queryString}`),
    postBoardComment: (id, body) =>
        axiosEnhanced.post(`${BASE_URL}/board/${id}`, body),
    postImageBoardComment: (id, body) =>
        axiosEnhanced.post(`${BASE_URL}/image-board/${id}`, body),
    postCommentReply: (commentId, body) =>
        axiosEnhanced.post(`${BASE_URL}/${commentId}/reply`, body),
    deleteComment: (commentId) =>
        axiosEnhanced.delete(`${BASE_URL}/${commentId}`)
}