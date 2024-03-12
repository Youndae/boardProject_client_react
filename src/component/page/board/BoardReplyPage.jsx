import React from 'react';
import { useParams } from "react-router-dom";

import BoardWriteForm from "./BoardWriteForm";

function BoardReplyPage(props) {

    const {boardNo} = useParams();

    function handleSubmit(e) {
        e.preventDefault();
        console.log("reply submit");
    }

    const handleData = (values) => {
        console.log(values);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm handleData={handleData} />
            </form>
        </div>
    );
}

export default BoardReplyPage;