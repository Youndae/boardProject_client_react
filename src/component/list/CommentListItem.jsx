import React, { useState } from 'react';
import dayjs from "dayjs";
import styled from "styled-components";

import Button from "../ui/Button";

import {axiosErrorHandling, commentAxios} from "../../modules/customAxios";

const CommentWriterWrpper = styled.span`
    $.comment_userId {
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

function CommentListItem(props) {
    const {comment, uid, handleInputSuccess, boardNo, imageNo} = props;
    const [replyStatus, setReplyStatus] = useState(false);
    const [replyInputValue, setReplyInputValue] = useState('');

    console.log('comment nickname : ', comment);
    let commentIndentClassName = '';
    let writer = '';
    if (comment.commentIndent == 1)
        commentIndentClassName = ' indent_size_1';
    else if (comment.commentIndent == 2)
        commentIndentClassName = ' indent_size_2';
    else if (comment.commentIndent == 3)
        commentIndentClassName = ' indent_size_3';
    else if (comment.commentIndent == 4)
        commentIndentClassName = ' indent_size_4';

    if (comment.commentContent !== "삭제된 댓글입니다.")
        writer = comment.nickname;

    const handleReplyOnClick = async (e) => {

        await commentAxios.post(`reply`, {
            commentContent: replyInputValue,
            commentGroupNo: comment.commentGroupNo,
            commentIndent: comment.commentIndent,
            commentUpperNo: comment.commentUpperNo,
            boardNo: boardNo,
            imageNo: imageNo,
        })
        .then(res => {
            setReplyStatus(false);
            handleInputSuccess();
        })
        .catch(err => {
            axiosErrorHandling(err);
        })
    }

    const handleReplyOnchange = (e) => {
        setReplyInputValue(e.target.value);
    }

    const replyOnClick = (e) => {
        setReplyStatus(true);
    }

    const deleteOnClick = async (e) => {
        const deleteCommentNo = e.target.value;

        await commentAxios.delete(`${deleteCommentNo}`)
            .then(res => {
                handleInputSuccess();
            })
            .catch(err => {
                axiosErrorHandling(err);
            });
    }

    const replyCloseClick = (e) => {
        e.preventDefault();
        setReplyStatus(false);
    }

    const handleReplyInputPressKey = (e) => {
        if(e.key === 'Enter')
            handleReplyOnClick();
    }

    let replyButton = <Button btnText={"답글"} onClick={replyOnClick}/>
    let deleteButton = <Button btnText={"삭제"} onClick={deleteOnClick} value={comment.commentNo}/>
    let replyInput = null;

    if(writer === ''){
        deleteButton = null;
        replyButton = null;
    }

    if(uid == null){
        replyButton = null;
        deleteButton = null;
    }else if(uid !== null && uid !== writer) {
        deleteButton = null;
    }



    if(replyStatus){
        const replyBody = {
            commentGroupNo: comment.commentGroupNo,
            commentIndent: comment.commentIndent,
            commentUpperNo: comment.commentUpperNo,
            handleReplyOnchange: handleReplyOnchange,
            handleReplyOnClick: handleReplyOnClick,
            handleReplyInputPressKey: handleReplyInputPressKey,
        };
        replyInput = ReplyInput(replyBody);
        replyButton = <Button btnText={"닫기"} onClick={replyCloseClick}/>;
        deleteButton = null;
    }

    return (
        <div className="comment-box">
            <table className="table table-hover">
                <tbody>
                    <tr>
                        <td>
                            <CommentWriterWrpper className={`comment_userId${commentIndentClassName}`}>{writer}</CommentWriterWrpper>
                            <CommentDateWrapper className={`comment_date${commentIndentClassName}`}>{dayjs(comment.commentDate).format('YYYY-MM-DD')}</CommentDateWrapper>
                            <CommentContentWrapper className={`comment_content${commentIndentClassName}`}>{comment.commentContent}</CommentContentWrapper>
                            {replyButton}
                            {deleteButton}
                        </td>
                    </tr>
                </tbody>
            </table>
            {replyInput}
        </div>
    )
}

function ReplyInput(props) {
    const {
                commentGroupNo
                , commentIndent
                , commentUpperNo
                , handleReplyOnchange
                , handleReplyOnClick
                , handleReplyInputPressKey
            } = props;

    return (
        <div className={"commentReplyContent"}>
            <input type={"text"} onChange={handleReplyOnchange} onKeyUp={handleReplyInputPressKey} autoFocus/>
            <Button btnText={"작성"} onClick={handleReplyOnClick}/>
            <input type={"hidden"} id={"commentGroupNo"} value={commentGroupNo}/>
            <input type={"hidden"} id={"commentIndent"} value={commentIndent}/>
            <input type={"hidden"} id={"commentUpperNo"} value={commentUpperNo}/>
        </div>
    )
}

export default CommentListItem;