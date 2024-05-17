import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import CommentListItem from "./CommentListItem";
import Button from "../ui/Button";
import DisabledButton from "../ui/DisabledButton";
import Paging from "../ui/Paging";

import {axiosErrorHandling, commentAxios} from "../../modules/customAxios";
import {createPagingObject} from "../../modules/pagingModule";

const CommentInputWrapper = styled.input`
    width: 250px;
`

function CommentList(props) {
    const { boardNo, imageNo } = props;
    const [inputValue, setInputValue] = useState('');
    const [commentPageNo, setCommentPageNo] = useState(1);
    const [commentValue, setCommentValue] = useState([]);
    const [uid, setUid] = useState(null);
    const [pagingData, setPagingData] = useState({
        startPage: 0,
        endPage: 0,
        prev: false,
        next: false,
        activeNo: commentPageNo,
    });

    useEffect(() => {
        getCommentData(commentPageNo);
    }, [commentPageNo]);

    const getCommentData = async (pageNum) => {
        /*commentList 데이터*/
        await commentAxios.get(``, {
            params: {
                boardNo: boardNo,
                imageNo: imageNo,
                pageNum: commentPageNo,
            }
        })
            .then(res => {
                console.log('commentList res : ', res);
                setCommentValue(res.data.content);
                setUid(res.data.userStatus.uid);

                const pagingObject = createPagingObject(pageNum, res.data.totalPages);

                setPagingData({
                    startPage: pagingObject.startPage,
                    endPage: pagingObject.endPage,
                    prev: pagingObject.prev,
                    next: pagingObject.next,
                    activeNo: pageNum,
                });
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    const inputOnChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleInputPressKey = (e) => {
        if(e.key === 'Enter')
            commentBtnOnClick(e);
    }

    const commentBtnOnClick = async (e) => {
        e.preventDefault();

        if(inputValue !== ''){
            await commentAxios.post(``, {
                commentContent: inputValue,
                boardNo: boardNo,
                imageNo: imageNo,
            })
                .then(res => {
                    setInputValue('');
                    handleInputSuccessRerender();
                })
                .catch(err => {
                    axiosErrorHandling(err);
                })
        }
    }

    const handleInputSuccessRerender = () => {
        getCommentData(commentPageNo);
    }

    const handleCommentPageNumOnClick = (e) => {
        const clickNo = e.target.textContent;

        setCommentPageNo(clickNo);
    }

    const handleCommentPagePrevOnClick = () => {
        const prevNo = pagingData.startPage - 1;

        setCommentPageNo(prevNo);
    }

    const handleCommentPageNextOnClick = () => {
        const nextNo = pagingData.endPage + 1;

        setCommentPageNo(nextNo);
    }

    let commentInputBtn = <DisabledButton
                            btnText={"작성"}
                            onClick={commentBtnOnClick}
                        />;
    let commentInput = <CommentInputWrapper
                            type={"text"}
                            placeholder={"로그인 후 댓글 작성이 가능합니다."}
                            value={''}
                            disabled={true}
                        />

    if(uid !== null){
        commentInputBtn = <Button
                            btnText={"작성"}
                            onClick={commentBtnOnClick}
                        />
        commentInput = <CommentInputWrapper
                            type={"text"}
                            id={"commentContent"}
                            name={"commentContent"}
                            placeholder={"댓글을 작성해주세요"}
                            onChange={inputOnChange}
                            value={inputValue}
                            onKeyUp={handleInputPressKey}
                        />
    }

    return (
        <>
            <form id="commentFrm">
                <div>
                    {commentInput}
                    {commentInputBtn}
                </div>
            </form>
            <div className="comment-area">
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
                <Paging
                    pagingData={pagingData}
                    pageNumOnClick={handleCommentPageNumOnClick}
                    prevOnClick={handleCommentPagePrevOnClick}
                    nextOnClick={handleCommentPageNextOnClick}
                />
            </div>
        </>
    )
}

export default CommentList;