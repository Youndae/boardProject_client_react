import React from 'react';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Button from "../../ui/Button";

import {axiosErrorHandling, boardAxios} from "../../../modules/customAxios";

function BoardDetailForm (props) {
    const { boardInfo, uid } = props;
    const navigate = useNavigate();

    const handleBoardDelete = async (e) => {
        await boardAxios.delete(`${boardInfo.boardNo}`)
            .then(res => {
                navigate('/');
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    const writer = boardInfo.userId;
    let replyBtn = null;
    let modifyBtn = null;
    let deleteBtn = null;

    if(uid !== null){
        if(uid === writer){
            modifyBtn = <Button
                            btnText="수정"
                            onClick={() => {
                                navigate(`/board/update/${boardInfo.boardNo}`)
                            }}
                        />

            deleteBtn = <Button
                            btnText="삭제"
                            onClick={handleBoardDelete}
                        />
        }

        replyBtn = <Button
                        btnText="답글"
                        btnDivClassName="form-row float-right mb-3"
                        onClick={() => {
                            navigate(`/board/reply/${boardInfo.boardNo}`)
                        }}
                    />
    }


    return (
        <div>
            <div className="form-row float-right mb-3">
                {replyBtn}
                {modifyBtn}
                {deleteBtn}
            </div>

            <div className="form-group">
                <label>제목</label>
                <p>{boardInfo.boardTitle}</p>
            </div>
            <div className="form-group">
                <label>작성자</label>
                <p>{writer}</p>
            </div>
            <div className="form-group">
                <label>작성일</label>
                <p>{dayjs(boardInfo.boardDate).format('YYYY-MM-DD')}</p>
            </div>
            <div className="form-group">
                <label>내용</label>
                <p>{boardInfo.boardContent}</p>
            </div>
        </div>
    );
}

export default BoardDetailForm;