import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

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

function BoardItem(props) {
    const { board } = props;
    const indent = Math.min(board.indent, 4);
    const titleIndent = `title_indent_${indent}`;

    return (
        <tr>
            <td>{board.id}</td>
            <td>
                <TitleWrapper className={titleIndent}>
                    <Link to={`board/${board.id}`}>{board.title}</Link>
                </TitleWrapper>
            </td>
            <td>{board.writer}</td>
            <td>{dayjs(board.createdAt).format('YYYY-MM-DD')}</td>
        </tr>
    )
}

export default BoardItem;