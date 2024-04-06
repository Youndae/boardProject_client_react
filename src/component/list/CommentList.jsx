import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import CommentListItem from "./CommentListItem";
import Button from "../ui/Button";
import DisabledButton from "../ui/DisabledButton";
import Paging from "../ui/Paging";

import {customAxios} from "../../modules/customAxios";
import {createPagingObject} from "../../modules/pagingModule";

const CommentInputWrapper = styled.input`
    width: 250px;
`

const comment_default = process.env.REACT_APP_API_COMMENT;
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

            const pagingObject = createPagingObject(pageNum, response.data.totalPages);

            setPagingData({
                startPage: pagingObject.startPage,
                endPage: pagingObject.endPage,
                prev: pagingObject.prev,
                next: pagingObject.next,
                activeNo: pageNum,
            });
        }catch (err) {
            console.error("commentError : ", err);
        }
    }

    let commentInputBtn = <DisabledButton
                            btnText={"작성"}
                            onClick={commentBtnOnClick}
                        />;
    let commentInput = <CommentInputWrapper
                            type={"text"}
                            placeholder={"로그인 후 댓글 작성이 가능합니다."}
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

    console.log('commentValue : ', commentValue);

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
                    console.log('comment: ', comment);
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