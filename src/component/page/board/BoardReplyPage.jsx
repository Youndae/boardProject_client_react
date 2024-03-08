import React from 'react';
import { useParams } from "react-router-dom";

import BoardWriteForm from "./BoardWriteForm";

function BoardReplyPage(props) {

    const { boardNo } = useParams();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("reply submit");
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm
                    data={boardNo}
                />
            </form>
        </div>
    );
}

export default BoardReplyPage;