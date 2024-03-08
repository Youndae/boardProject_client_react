import React from 'react';
import { useParams } from 'react-router-dom';

import BoardDetailForm from "./BoardDetailForm";

import data from '../../../data.json';


function BoardDetailPage (props) {
    const {} = props;
    const { boardNo } = useParams();



    const board = data.find((item) => {
        return item.boardNo == boardNo;
    });

    return (
        <div className="container">
            <BoardDetailForm
                boardInfo={board}
            />
            {/*comment*/}
        </div>
    );
}

export default BoardDetailPage;