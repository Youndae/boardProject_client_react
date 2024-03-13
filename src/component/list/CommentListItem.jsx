import React, { useState } from 'react';

import Button from "../ui/Button";

function CommentListItem(props) {
    const { comment } = props;

    let commentIndentClassName = '';
    let writer = '';
    if(comment.commentIndent == 1)
        commentIndentClassName = ' indent_size_1';
    else if(comment.commentIndent == 2)
        commentIndentClassName = ' indent_size_2';
    else if(comment.commentIndent == 3)
        commentIndentClassName = ' indent_size_3';
    else if(comment.commentIndent == 4)
        commentIndentClassName = ' indent_size_4';

    if(comment.commentContent !== "삭제된 댓글입니다.")
        writer = comment.userId;


    const replyOnClick = () => {
        console.log("reply btn click");
    }

    const deleteOnClick = () => {
        console.log('delete btn click');
    }

    return (
        <div className="comment-box">
            <table className="table table-hover">
                <tr>
                    <td>
                        <span className={`comment_userId${commentIndentClassName}`}>{writer}</span>
                        <span className={`comment_date${commentIndentClassName}`}>{comment.commentDate}</span>
                        <p className={`comment_content${commentIndentClassName}`}>{comment.commentContent}</p>
                        <Button
                            btnText={"답글"}
                            onClick={replyOnClick}
                        />
                        <Button
                            btnText={"삭제"}
                            onClick={deleteOnClick}
                        />
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default CommentListItem;