import React from 'react';
import { useNavigate } from "react-router-dom";
import {customAxios} from "../../../modules/customAxios";

import dayjs from "dayjs";

import Button from "../../ui/Button";

const board_default = process.env.REACT_APP_API_BOARD;
function BoardDetailForm (props) {
    const { boardInfo, uid } = props;
    const navigate = useNavigate();

    const handleBoardDelete = async (e) => {
        await customAxios.delete(`${board_default}${boardInfo.boardNo}`)
            .then(res => {
                console.log('res.data : ', res.data);
                navigate('/');
            })
            .catch(err => {
                console.error('board delete axios error : ', err);
                alert('오류가 발생했습니다.\n문제가 계속된다면 관리자에게 문의해주세요.');
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
                {/*<Button
                    btnText="답글"
                    btnDivClassName="form-row float-right mb-3"
                    onClick={() => {
                        navigate(`/board/reply/${boardInfo.boardNo}`)
                    }}
                />
                <Button
                    btnText="수정"
                    onClick={() => {
                        navigate(`/board/update/${boardInfo.boardNo}`)
                    }}
                />
                <Button
                    btnText="삭제"
                    onClick={handleBoardDelete}
                />*/}
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