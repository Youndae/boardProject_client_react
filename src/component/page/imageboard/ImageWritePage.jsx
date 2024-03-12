import React from 'react';

import BoardWriteForm from "../board/BoardWriteForm";
import Button from "../../ui/Button"

function ImageWritePage(props) {
    function handleSubmit(e) {
        e.preventDefault();
    }

    const handleData = (values) => {
        console.log('handleData : ', values);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm handleData={handleData}/>
                <input type={"file"} multiple />
            </form>
        </div>
    )
}

export default ImageWritePage;