import React, {useEffect, useState} from 'react';

import CommentListItem from "./CommentListItem";
import Button from "../ui/Button";
import {customAxios} from "../../modules/customAxios";


const comment_default = process.env.REACT_APP_API_COMMENT;
function CommentList(props) {
    const { boardNo, imageNo } = props;
    const [inputValue, setInputValue] = useState('');
    const [commentPageNo, setCommentPageNo] = useState(1);
    const [commentValue, setCommentValue] = useState([]);
    const [uid, setUid] = useState(null);

    const inputOnChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleInputPressKey = (e) => {
        if(e.key === 'Enter')
            console.log('input enter');
    }

    const commentBtnOnClick = async (e) => {
        e.preventDefault();

        await customAxios.post(`${comment_default}`, {
            commentContent: inputValue,
            boardNo: boardNo,
            imageNo: imageNo,
        })
            .then(res => {
                console.log('comment insert res : ', res);
                setInputValue('');
                handleInputSuccessRerender();
            })
            .catch(err => {
                console.log('comment insert error : ', err);
            })
    }

    const handleInputSuccessRerender = (e) => {
        console.log('handleInput SuccessRerender');
        getCommentData(commentPageNo);
    }

    useEffect(() => {
        getCommentData(commentPageNo);
    }, [commentPageNo]);

    const getCommentData = async (pageNum) => {
        /*commentList 데이터*/
        try{
            const response = await customAxios.get(`${comment_default}`, {
                params: {
                    boardNo: boardNo,
                    imageNo: imageNo,
                    pageNum: commentPageNo,
                }
            });

            console.log("commentResponse : ", response);
            setCommentValue(response.data.content);
            setUid(response.data.userStatus.uid);
        }catch (err) {
            console.error("commentError : ", err);
        }
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
                        value={inputValue}
                        onKeyUp={handleInputPressKey}
                    />
                    <Button
                        btnText={"작성"}
                        onClick={commentBtnOnClick}
                    />
                </div>
            </form>
            <div className="comment-area">
                {/*댓글 리스트*/}
                {commentValue.map((comment, index) => {
                    return (
                        <CommentListItem
                            key={comment.commentNo}
                            comment={comment}
                            uid={uid}
                            handleInputSuccess={handleInputSuccessRerender}
                            boardNo={boardNo}
                            imageNo={imageNo}
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