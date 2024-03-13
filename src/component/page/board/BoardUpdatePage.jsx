import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import BoardWriteForm from "./BoardWriteForm";
import Button from "../../ui/Button";

import data from '../../../data.json';

function BoardUpdatePage(props) {
    const { boardNo } = useParams();

    const board = data.find((item) => {
        return item.boardNo == boardNo;
    });

    const [values, setValues] = useState({
        title: board.boardTitle,
        content: board.boardContent,
    })

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("update submit!");
        console.log("title : ", values.title);
        console.log("content : ", values.content);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm values={values} handleChange={handleChange}/>
                <Button
                    btnText={"등록"}
                />
            </form>
        </div>
    );

}

export default BoardUpdatePage;