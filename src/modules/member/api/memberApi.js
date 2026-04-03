import { axiosSimple } from "../../../common/utils/axios/axiosSimple";
import { axiosEnhanced } from "../../../common/utils/axios/axiosEnhanced";

const BASE_URL = '/member';

export const memberApi = {
    login: (body) =>
        axiosSimple.post(`${BASE_URL}/login`, body),
    logout: () =>
        axiosEnhanced.post(`${BASE_URL}/logout`),
    postJoin: (body) =>
        axiosSimple.post(
            `${BASE_URL}/join`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ),
    checkUserId: (userId) =>
        axiosSimple.get(`${BASE_URL}/check-id/${userId}`),
    checkNickname: (nickname) =>
        axiosSimple.get(`${BASE_URL}/check-nickname/${nickname}`),
    postOAuthJoinProfile: (body) =>
        axiosEnhanced.post(
            `${BASE_URL}/oauth/join/profile`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ),
    getProfile: () =>
        axiosEnhanced.get(`${BASE_URL}/profile`),
    patchProfile: (body) =>
        axiosEnhanced.patch(
            `${BASE_URL}/profile`,
            body,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ),
    checkUserStatus: () =>
        axiosSimple.get(`${BASE_URL}/status`)
}