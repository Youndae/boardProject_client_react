import { memberApi } from '../api/memberApi';

export const postLogin = async (values) => await memberApi.login(values);

export const postLogout = async () => await memberApi.logout();

export const postJoin = async (formData) => await memberApi.postJoin(formData);

export const checkId = async (userId) => await memberApi.checkUserId(userId);

export const checkNickname = async (nickname) => await memberApi.checkNickname(nickname);

export const postJoinDataByOAuthUser = async (formData) => await memberApi.postOAuthJoinProfile(formData);

export const getProfile = async () => await memberApi.getProfile();

export const patchProfile = async (formData) => await memberApi.patchProfile(formData);

export const checkStatus = async () => await memberApi.checkUserStatus();