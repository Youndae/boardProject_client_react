import {buildQueryString} from "../../../common/utils/queryStringUtils";
import { boardApi } from '../api/boardApi';

export const getList = async (pageNum, keyword, searchType) => {
    const queryString = buildQueryString({
        page: pageNum,
        keyword,
        searchType
    })

    return boardApi.getList(queryString);
}

export const getDetail = async (boardId) => await boardApi.getDetail(boardId);

export const deleteBoard = async (boardId) => await boardApi.deleteBoard(boardId);

export const postBoard = async (values) => await boardApi.postBoard(values);

export const getPatchDetail = async (boardId) => await boardApi.getPatchDetail(boardId);

export const patchBoard = async (boardId, values) => await boardApi.patchBoard(boardId, values);

export const getReplyData = async (boardId) => await boardApi.getReplyData(boardId);

export const postBoardReply = async(boardId, body) => await boardApi.postReply(boardId, body);