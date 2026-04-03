import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BoardWriteForm from '../../../common/components/BoardWriteForm';
import Button from '../../../common/components/Button';

import { getPatchDetail, patchBoard } from '../services/boardService';

function BoardUpdatePage() {
    const { id } = useParams();
    const [values, setValues] = useState({
        title: '',
        content: '',
    })
    const navigate = useNavigate();

    useEffect(() => {
        const patchData = async (boardId) => {
            try {
                const res = await getPatchDetail(boardId);

                setValues({
                    title: res.data.title,
                    content: res.data.content,
                });
            }catch(err) {
                console.error('Failed get patch board data: ', err);
            }
        }

        patchData(id);
    }, [id]);

    const handleOnChange = (e) => {
        e.preventDefault();

        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = values.title;
        const content = values.content;

        if(title === '' || !title)
            alert('제목을 입력해주세요.');
        else if(content === '' || !content)
            alert('내용을 입력해주세요.');
        else {
            try {
                const res = await patchBoard(id, values);

                const patchId = res.data.content;

                navigate(`/board/${patchId}`);
            }catch(err) {
                console.error('Failed patch board: ', err);
            }
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm
                    values={values}
                    handleChange={handleOnChange}
                />
                <Button
                    btnText={'등록'}
                />
            </form>
        </div>
    )
}

export default BoardUpdatePage;