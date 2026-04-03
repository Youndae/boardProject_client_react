import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import CommentList from '../../comment/components/CommentList';

import { getDetail, deleteBoard } from '../services/boardService';
import {useSelector} from "react-redux";

import Button from '../../../common/components/Button';
import dayjs from "dayjs";

function BoardDetailPage() {
    const { id } = useParams();
    const [data, setData] = useState({
        title: '',
        writer: '',
        writerId: '',
        content: '',
        createdAt: '',
    });
    const uid = useSelector((state) => state.member.id) ?? null;
    const navigate = useNavigate();

    useEffect(() => {
        const getBoardDetailData = async (boardId) => {
            try {
                const res = await getDetail(boardId);

                console.log("res : ", res);

                setData(res.data.content);
            }catch(err) {
                console.log('failed get board detail data: ', err);
            }
        }

        getBoardDetailData(id);
    }, [id]);

    const handleDeleteBtnOnClick = async () => {
        try {
            await deleteBoard(id);
            navigate('/');
        }catch(err) {
            console.error('Failed delete board: ', err);
        }
    }

    const isWriter = uid === data.writerId;

    return (
        <div className="container">
            <div>
                <div className="form-row float-right mb-3">
                    {uid &&
                        <Button
                            btnText={'답글'}
                            btnDivClassName={"form-row float-right mb-3"}
                            onClick={() => {navigate(`/board/reply/${id}`)}}
                        />
                    }
                    {isWriter &&
                        <>
                            <Button
                                btnText={'수정'}
                                onClick={() => {navigate(`/board/update/${id}`)}}
                            />
                            <Button
                                btnText={'삭제'}
                                onClick={handleDeleteBtnOnClick}
                            />
                        </>
                    }
                </div>
                <div className="form-group">
                    <label>제목</label>
                    <p>{data.title}</p>
                </div>
                <div className="form-group">
                    <label>작성자</label>
                    <p>{data.writer}</p>
                </div>
                <div className="form-group">
                    <label>작성일</label>
                    <p>{dayjs(data.createdAt).format('YYYY-MM-DD')}</p>
                </div>
                <div className="form-group">
                    <label>내용</label>
                    <p>{data.content}</p>
                </div>
            </div>
            <CommentList
                boardId={id}
            />
        </div>
    )
}

export default BoardDetailPage;