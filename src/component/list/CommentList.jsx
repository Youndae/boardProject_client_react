import React, { useState } from 'react';
import styled from 'styled-components';

import CommentListItem from "./CommentListItem";
import Button from "../ui/Button";

function CommentList(props) {
    const { imageNo } = props;

    const [value, setValue] = useState();

    const inputOnChange = (e) => {
        setValue(e.target.value);
    }

    const commentBtnOnClick = () => {
        console.log("comment btn click");
    }

    const comment = () => {
        /*commentList 데이터*/
    }

    return (
        <>
            <form id="commentFrm">
                <div>
                    <input
                        type={"text"}
                        id={"commentContent"}
                        name={"commentContent"}
                        placeholder={"댓글을 작성해주세요"}
                        onChange={inputOnChange}
                        value={value}
                    />
                    <Button
                        btnText={"작성"}
                        onClick={() => {
                            commentBtnOnClick();
                        }}
                    />
                </div>
            </form>
            <div className="comment-area">
                {/*댓글 리스트*/}
                {comment.map((comment, index) => {
                    return (
                        <CommentListItem
                            key={comment.commentNo}
                            comment={comment}
                        />
                    )
                })}

            </div>
            <div className="comment-paging">
                {/*댓글 페이징 버튼*/}
            </div>
        </>
    )
}

export default CommentList;