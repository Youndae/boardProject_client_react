import React from 'react';
import styled from 'styled-components';

const TitleWrapper = styled.span`
    &.title_indent_1 {
        padding-left: 20px;
    }
    &.title_indent_2 {
        padding-left: 40px;
    }
    &.title_indent_3 {
        padding-left: 60px;
    }
    &.title_indent_4 {
        padding-left: 80px;
    }
`;

const TrWrapper = styled.tr`
    border: 1px solid black;
`;


function TextBoardListItem(props) {
    const {board, onClick} = props;

    let title_indent;
    if(board.boardIndent === 0)
        title_indent = 'title_indent_0';
    else if(board.boardIndent === 1)
        title_indent = 'title_indent_1';
    else if(board.boardIndent === 2)
        title_indent = 'title_indent_2';
    else if(board.boardIndent === 3)
        title_indent = 'title_indent_3';
    else if(board.boardIndent === 4)
        title_indent = 'title_indent_4';

    const date = new Date(board.boardDate);
    const formatDate = new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);

    return (
        <tr>
            <td>{board.boardNo}</td>
            <td>
                <TitleWrapper className={title_indent}>
                    <a onClick={onClick}>{board.boardTitle}</a>
                </TitleWrapper>
            </td>
            <td>{board.userId}</td>
            <td>{formatDate}</td>
        </tr>
    );
}

export default TextBoardListItem;