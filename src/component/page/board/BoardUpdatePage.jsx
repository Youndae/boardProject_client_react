import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import BoardWriteForm from "./BoardWriteForm";
import Button from "../../ui/Button";
import axios from "axios";

import data from '../../../data.json';

function BoardUpdatePage(props) {
    const { boardNo } = useParams();
    const [data, setData] = useState({});

    const updateData = async (boardNo) => {
        try{
            const response = await axios.get(`http://localhost:9096/board/board-modify/${boardNo}`);

            setData(response.data);
        }catch (err) {
            console.error('axios err : ', err);
        }
    }

    useEffect(() => {
        updateData(boardNo);
    })

    const [values, setValues] = useState({
        title: data.boardTitle,
        content: data.boardContent,
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