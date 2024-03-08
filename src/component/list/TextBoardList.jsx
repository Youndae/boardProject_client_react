import React from 'react';
import styled from 'styled-components';
import TextBoardListItem from "./TextBoardListItem";
import Button from "../ui/Button";

const Wrapper = styled.div`

`;

const Table = styled.table`
    border: solid 1px black;
`;

function TextBoardList(props) {
    const { board, onClickItem, onClickBtn } = props;

    return (
        <Wrapper>
            <Button
                btnText="글작성"
                btnDivClassName="mb-4"
                onClick={() => {
                    onClickBtn();
                }}
            />
            <table className="table table-hover">
                <tr>
                    <th>글번호</th>
                    <th>글제목</th>
                    <th>작성자</th>
                    <th>작성일</th>
                </tr>
                {board.map((board, index) => {
                    return (
                        <TextBoardListItem
                            key={board.boardNo}
                            board={board}
                            onClick={() => {
                                onClickItem(board);
                            }}
                        />
                    )
                })}
            </table>
        </Wrapper>
    );
}

export default TextBoardList;