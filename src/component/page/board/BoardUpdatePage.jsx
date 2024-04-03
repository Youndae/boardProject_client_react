import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";


import BoardWriteForm from "./BoardWriteForm";
import Button from "../../ui/Button";
import {customAxios} from "../../../modules/customAxios";


const board_default = process.env.REACT_APP_API_BOARD;
function BoardUpdatePage(props) {
    const { boardNo } = useParams();
    const [values, setValues] = useState({
        title: '',
        content: '',
    })
    const navigate = useNavigate();

    const updateData = async (boardNo) => {

        await customAxios.get(`${board_default}patch-detail/${boardNo}`)
            .then(res => {
                console.log('update detail res.data : ', res.data);
                setValues({
                    title: res.data.content.boardTitle,
                    content: res.data.content.boardContent,
                });
            })
            .catch(err => {
                console.error('update detail axios error : ', err);
            });
    }

    useEffect(() => {
        updateData(boardNo);
    }, [boardNo]);

    const handleChange = (e) => {
        e.preventDefault();
        console.log('handleChange');
        setValues({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("update submit!");
        console.log("title : ", values.title);
        console.log("content : ", values.content);

        await customAxios.patch(`${board_default}${boardNo}`, {
            boardTitle: values.title,
            boardContent: values.content,
        })
            .then(res => {
                console.log('patch axios res.data : ', res.data);
                const patchNo = res.data;
                navigate(`/board/${patchNo}`);
            })
            .catch(err => {
                console.error('patch axios error : ', err);
            })
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