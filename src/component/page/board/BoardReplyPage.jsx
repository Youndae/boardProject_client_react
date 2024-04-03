import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import {customAxios} from "../../../modules/customAxios";



import BoardWriteForm from "./BoardWriteForm";
import Button from "../../ui/Button";


const board_default = process.env.REACT_APP_API_BOARD;
function BoardReplyPage(props) {
    const {boardNo} = useParams();
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
        await customAxios.get(`${board_default}reply/${boardNo}`)
            .then(res => {
                console.log('res.data.content : ', res.data.content);
                setReplyValues({
                    boardGroupNo: res.data.content.boardGroupNo,
                    boardIndent: res.data.content.boardIndent,
                    boardUpperNo: res.data.content.boardUpperNo,
                });
            })
            .catch(err => {
                console.error('reply get axios error : ', err);
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("reply submit");

        console.log('parents boardNo : ', boardNo);
        console.log('title : ', values.title);
        console.log('content : ', values.content);

        await customAxios.post(`${board_default}reply`,
            {
                boardTitle: values.title,
                boardContent: values.content,
                boardGroupNo: replyValues.boardGroupNo,
                boardIndent: replyValues.boardIndent,
                boardUpperNo: replyValues.boardUpperNo,
            })
            .then(res => {
                console.log('reply insert res : ', res);
                const insertNo = res.data;
                navigate(`/board/${insertNo}`);
            })
            .catch(err => {
                console.error('reply insert axios error : ', err);
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