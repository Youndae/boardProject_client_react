import React, { useState } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';

import Button from '../../../common/components/Button';

import { postCommentReply, deleteComment } from "../service/commentService";

const CommentWriterWrapper = styled.span`
    &.comment_userId {
        display: inline;
        margin-right: 10px;
        font-weight: 600;
        font-size: large;    
    }
`;

const CommentDateWrapper = styled.span`
    &.comment_date {
        font-size: small;
        color: gray;
    }
`

const CommentContentWrapper = styled.p`
    &.comment_content {
        margin-top: 20px;
        margin-bottom: 20px;
    }
    &.indent_size_1 {
        padding-left: 20px;
    }
    &.indent_size_2 {
        padding-left: 40px;
    }
    &.indent_size_3 {
        padding-left: 60px;
    }
    &.indent_size_4 {
        padding-left: 80px;
    }
`;

function CommentItem(props) {
    const {
        comment,
        uid,
        handleInputSuccess
    } = props;
    const [replyStatus, setReplyStatus] = useState(false);
    const [replyInputValue, setReplyInputValue] = useState('');

    const indent = Math.min(comment.indent, 4);
    const commentIndent = ` indent_size_${indent}`;

    const handleReplySubmit = async () => {

        try {
            await postCommentReply(
                {
                    commentId: comment.id,
                    content: replyInputValue,
                }
            );
            handleReplyCloseBtnOnClick();
            handleInputSuccess();
        }catch (err) {
            console.error('Failed postCommentReply');
        }
    }

    const handleReplyInputOnChange = (e) => {
        setReplyInputValue(e.target.value);
    }

    const handleReplyBtnOnClick = () => {
        setReplyInputValue('');
        setReplyStatus(true);
    }

    const handleDeleteBtnOnClick = async () => {
        try {
            await deleteComment(comment.id);
            handleInputSuccess();
        }catch(err) {
            console.error('Failed delete comment');
        }
    }

    const handleReplyCloseBtnOnClick = () => {
        setReplyInputValue('');
        setReplyStatus(false);
    }

    const handleReplyInputEnterKey = (e) => {
        if(e.key === 'Enter')
            handleReplySubmit();
    }

    let replyInput = null;
    let replyBtn = <Button btnText={"답글"} onClick={handleReplyBtnOnClick}/>
    const isAuthor = uid !== null && uid === comment.writerId
    const isLoggedIn = uid !== null;
    if(replyStatus) {
        const replyBody = {
            indent: comment.indent,
            handleReplyInputOnChange: handleReplyInputOnChange,
            handleReplySubmit: handleReplySubmit,
            handleReplyInputEnterKey: handleReplyInputEnterKey,
        }
        replyInput = ReplyInput(replyBody);
        replyBtn = <Button btnText={'닫기'} onClick={handleReplyCloseBtnOnClick}/>;
    }

    let commentBody;

    if(comment.isDeleted) {
        commentBody = <td>
                        <CommentWriterWrapper className={`comment_userId${commentIndent}`}/>
                        <CommentDateWrapper className={`comment_date${commentIndent}`}>{dayjs(comment.createdAt).format('YYYY-MM-DD')}</CommentDateWrapper>
                        <CommentContentWrapper className={`comment_content${commentIndent}`}>{comment.content}</CommentContentWrapper>
                    </td>
    }else {
        commentBody = <td>
                        <CommentWriterWrapper className={`comment_userId${commentIndent}`}>{comment.writer}</CommentWriterWrapper>
                        <CommentDateWrapper className={`comment_date${commentIndent}`}>{dayjs(comment.createdAt).format('YYYY-MM-DD')}</CommentDateWrapper>
                        <CommentContentWrapper className={`comment_content${commentIndent}`}>{comment.content}</CommentContentWrapper>
                        {isLoggedIn !== null && replyBtn}
                        {isAuthor && <Button btnText={'삭제'} onClick={handleDeleteBtnOnClick} value={comment.id}/>}
                    </td>
    }

    return (
        <div className="comment-box">
            <table className="table table-hover">
                <tbody>
                    <tr>
                        {commentBody}
                    </tr>
                </tbody>
            </table>
            {replyInput}
        </div>
    )

}

function ReplyInput(props) {
    const {
        indent,
        handleReplyInputOnChange,
        handleReplySubmit,
        handleReplyInputEnterKey
    } = props;

    return (
        <div className={"commentReplyContent"}>
            <input type={"text"} onChange={handleReplyInputOnChange} onKeyUp={handleReplyInputEnterKey} autoFocus/>
            <Button btnText={"작성"} onClick={handleReplySubmit}/>
            <input type={"hidden"} id={"commentIndent"} value={indent}/>
        </div>
    )
}

export default CommentItem;