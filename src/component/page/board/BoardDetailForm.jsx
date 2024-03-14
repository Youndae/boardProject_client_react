import React from 'react';
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

function BoardDetailForm (props) {
    const { boardInfo } = props;
    const navigate = useNavigate();
    // console.log('boardInfo : ', boardInfo);

    /*const date = new Date(boardInfo.boardDate);
    const formatDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);*/

    return (
        <div>
            <div className="form-row float-right mb-3">
                <Button
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
                    onClick={() => {
                        navigate(`/board/delete/${boardInfo.boardNo}`)
                    }}
                />
            </div>

            <div className="form-group">
                <label>제목</label>
                <p>{boardInfo.boardTitle}</p>
            </div>
            <div className="form-group">
                <label>작성자</label>
                <p>{boardInfo.userId}</p>
            </div>
            <div className="form-group">
                <label>작성일</label>
                <p>{boardInfo.boardDate}</p>
            </div>
            <div className="form-group">
                <label>내용</label>
                <p>{boardInfo.boardContent}</p>
            </div>
        </div>
    );
}

export default BoardDetailForm;