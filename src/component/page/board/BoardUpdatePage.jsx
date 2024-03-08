import React from 'react';
import { useParams } from "react-router-dom";

import BoardWriteForm from "./BoardWriteForm";

import data from '../../../data.json';

function BoardUpdatePage(props) {
    const {} = props;
    const { boardNo } = useParams();

    const board = data.find((item) => {
        return item.boardNo == boardNo;
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log("update submit!");
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm
                    data={board}
                />
            </form>
        </div>
    );

}

export default BoardUpdatePage;