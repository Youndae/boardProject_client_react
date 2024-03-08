import React from 'react';

import Button from "../../ui/Button";

function BoardDetailForm (props) {
    const { boardInfo } = props;

    return (
        <div>
            <Button
                btnText="답글"
                btnDivClassName="form-row float-right mb-3"
            />
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