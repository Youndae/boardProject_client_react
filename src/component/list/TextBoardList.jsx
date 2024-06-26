import React from 'react';

import TextBoardListItem from "./TextBoardListItem";
import Button from "../ui/Button";

function TextBoardList(props) {
    const { data, onClickBtn } = props;

    return (
        <div>
            <div className="form-row float-right mb-1">
                <Button
                    btnText="글작성"
                    onClick={() => {
                        onClickBtn();
                    }}
                />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>글제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => {
                        return (
                            <TextBoardListItem
                                key={data.boardNo}
                                board={data}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TextBoardList;