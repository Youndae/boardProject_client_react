import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import BoardWriteForm from "./BoardWriteForm";
import Button from "../../ui/Button";

function BoardReplyPage(props) {

    const {boardNo} = useParams();
    const [values, setValues] = useState({
        title: "",
        content: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        console.log("reply submit");

        console.log('parents boardNo : ', boardNo);
        console.log('title : ', values.title);
        console.log('content : ', values.content);
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value,
        })
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm values={values} handleChange={handleChange} />
                <Button
                    btnText={"등록"}
                />
            </form>
        </div>
    );
}

export default BoardReplyPage;