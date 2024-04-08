import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {axiosErrorHandling, boardAxios} from "../../../modules/customAxios";

import BoardWriteForm from "./BoardWriteForm";
import Button from "../../ui/Button";

function BoardReplyPage() {
    const { boardNo } = useParams();
    const [values, setValues] = useState({
        title: "",
        content: "",
    });
    const [replyValues, setReplyValues] = useState({
        boardGroupNo: '',
        boardIndent: '',
        boardUpperNo: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        getReplyData(boardNo);
    },[boardNo]);

    const getReplyData = async (boardNo) => {
        await boardAxios.get(`reply/${boardNo}`)
            .then(res => {
                setReplyValues({
                    boardGroupNo: res.data.content.boardGroupNo,
                    boardIndent: res.data.content.boardIndent,
                    boardUpperNo: res.data.content.boardUpperNo,
                });
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await boardAxios.post(`reply`,
            {
                boardTitle: values.title,
                boardContent: values.content,
                boardGroupNo: replyValues.boardGroupNo,
                boardIndent: replyValues.boardIndent,
                boardUpperNo: replyValues.boardUpperNo,
            })
            .then(res => {
                const insertNo = res.data;
                navigate(`/board/${insertNo}`);
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
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