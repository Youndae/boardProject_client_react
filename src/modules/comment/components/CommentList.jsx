import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import styled from 'styled-components';

import CommentItem from '../components/CommentItem';
import Button from '../../../common/components/Button';
import DisabledButton from '../../../common/components/DisabledButton';
import Pagination from '../../../common/components/Pagination';

import {createPagingObject, getClickPageNumber } from '../../../common/utils/paginationUtils';

import { getCommentList, postComment } from '../service/commentService';


const CommentInputWrapper = styled.input`
    width: 250px;
`

function CommentList(props) {
    const { boardId, imageId } = props;
    const [inputValue, setInputValue] = useState('');
    const [commentPage, setCommentPage] = useState(1);
    const [commentList, setCommentList] = useState([]);
    const [pagingData, setPagingData] = useState({
        startPage: 0,
        endPage: 0,
        prev: false,
        next: false,
        activeNo: commentPage,
    });
    const uid = useSelector((state) => state.member.id) ?? null;

    useEffect(() => {
        getList(commentPage);
    }, [boardId, imageId, commentPage]);

    const getList = async (page) => {
        try {
            const res = await getCommentList(boardId, imageId, page);

            setCommentList(res.data.content.items);
            const pagingObject = createPagingObject(page, res.data.content.totalPages);

            setPagingData({
                startPage: pagingObject.startPage,
                endPage: pagingObject.endPage,
                prev: pagingObject.prev,
                next: pagingObject.next,
                activeNo: page,
            });
        }catch (err) {
            console.error('Failed get CommentList : ', err);
        }
    }

    const inputOnChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleInputEnterKey = (e) => {
        if(e.key === 'Enter')
            handleCommentSubmit(e);
    }

    const handleCommentSubmit = async (e) => {
       e.preventDefault();

       try {
           await postComment(boardId, imageId, inputValue);

           setInputValue('');
           handleRerender();
       }catch(err) {
           console.error('Failed PostComment : ', err);
       }
    }

    const handleRerender = () => {
        getList(commentPage);
    }

    const handlePageBtn = (type) => {
        const targetPage = getClickPageNumber(type, pagingData);
        console.log('handlePageBtn! type is ', type);
        console.log('handlePageBtn! targetPage is ', targetPage);
        setCommentPage(targetPage);
    }

    return(
        <>
            <div>
                <CommentInputWrapper
                    type={"text"}
                    id={uid ? "commentContent" : undefined}
                    name={uid ? "commentContent" : undefined}
                    placeholder={uid ? "댓글을 작성해주세요" : "로그인 후 댓글 작성이 가능합니다"}
                    onChange={uid ? inputOnChange : undefined}
                    value={uid ? inputValue : ''}
                    onKeyUp={uid ? handleInputEnterKey : undefined}
                    disabled={!uid}
                />
                {uid ? (
                    <Button
                        btnText={"작성"}
                        onClick={handleCommentSubmit}
                    />
                ) : (
                    <DisabledButton
                        btnText={"작성"}
                    />
                )}
            </div>
            <div className="comment-area">
                {commentList.map((comment, index) => {
                    return (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            uid={uid}
                            handleInputSuccess={handleRerender}
                        />
                    )
                })}
            </div>
            <div className="comment-paging">
                <Pagination
                    pagingData={pagingData}
                    handlePageBtn={handlePageBtn}
                />
            </div>
        </>
    )
}

export default CommentList;