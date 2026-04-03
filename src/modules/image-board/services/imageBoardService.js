import { buildQueryString } from "../../../common/utils/queryStringUtils";
import { imageBoardApi } from '../api/imageBoardApi';

export const getList = async (pageNum, keyword, searchType) => {
    const queryString = buildQueryString({
        page: pageNum,
        keyword,
        searchType
    })

    return imageBoardApi.getList(queryString);
}

export const getDetail = async (imageId) => await imageBoardApi.getDetail(imageId);

export const deleteImageBoard = async (imageId) => await imageBoardApi.deleteBoard(imageId);

export const postImageBoard = async (formData) => await imageBoardApi.postBoard(formData);

export const getPatchDetail = async (imageId) => await imageBoardApi.getPatchDetail(imageId);

export const patchImageBoard = async (imageId, formData) => await imageBoardApi.patchBoard(imageId, formData);