import React from 'react';
import { useNavigate } from "react-router-dom";


import TextBoardList from '../../list/TextBoardList';


import data from '../../../data.json';


function BoardPage(props) {
    const {} = props;

    const navigate = useNavigate();

    return (
        <div className="container">
            <TextBoardList
                board={data}
                onClickItem={(item) => {
                    navigate(`/board/${item.boardNo}`)
                }}
                onClickBtn={() => {
                    navigate('/board/insert')
                }}
            />
        </div>
    );
}

export default BoardPage;