import { buildQueryString } from "../../../common/utils/queryStringUtils";
import { commentApi } from '../api/commentApi';

export const getCommentList = async (boardId, imageId, page) => {
    const checkType = checkBoardType(boardId, imageId);

    const queryString = buildQueryString({
        id: checkType.id,
        page
    })

    if(checkType.isBoard)
        return commentApi.getBoardCommentList(queryString);
    else
        return commentApi.getImageBoardCommentList(queryString);
}

export const postComment = async (boardId, imageId, content) => {
    const checkType = checkBoardType(boardId, imageId);
    const postBody = {content: content}

    if(checkType.isBoard)
        return commentApi.postBoardComment(checkType.id, postBody);
    else
        return commentApi.postImageBoardComment(checkType.id, postBody);
}

const checkBoardType = (boardId, imageId) => {
    const isBoard = boardId !== undefined;
    const id = isBoard ? boardId : imageId;

    return {
        isBoard: isBoard,
        id: id,
    }
}

export const postCommentReply = async (data) => {
    const body = {
        content: data.content,
    }

    return commentApi.postCommentReply(data.commentId, body);
}

export const deleteComment = async (commentId) =>
    await commentApi.deleteComment(commentId);
