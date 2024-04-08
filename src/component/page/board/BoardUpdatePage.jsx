import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";


import BoardWriteForm from "./BoardWriteForm";
import Button from "../../ui/Button";

import {axiosErrorHandling, boardAxios} from "../../../modules/customAxios";

function BoardUpdatePage() {
    const { boardNo } = useParams();
    const [values, setValues] = useState({
        title: '',
        content: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
        updateData(boardNo);
    }, [boardNo]);

    const updateData = async (boardNo) => {

        await boardAxios.get(`patch-detail/${boardNo}`)
            .then(res => {
                setValues({
                    title: res.data.content.boardTitle,
                    content: res.data.content.boardContent,
                });
            })
            .catch(err => {
                axiosErrorHandling(err);
            });
    }

    const handleChange = (e) => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await boardAxios.patch(`${boardNo}`, {
            boardTitle: values.title,
            boardContent: values.content,
        })
            .then(res => {
                const patchNo = res.data;
                navigate(`/board/${patchNo}`);
            })
            .catch(err => {
                axiosErrorHandling(err);
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