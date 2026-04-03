import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import BoardWriteForm from '../../../common/components/BoardWriteForm';
import Button from '../../../common/components/Button';

import { getReplyData, postBoardReply } from '../services/boardService';

function BoardReplyPage() {
    const { id } = useParams();
    const [values, setValues] = useState({
        title: '',
        content: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async (boardId) => {
            try {
                // 원본 글 존재 여부 체크 용도
                await getReplyData(boardId);
            }catch(err) {
                console.error('Failed get board reply data: ', err);
            }
        }

        getData(id);
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = values.title;
        const content = values.content;

        if(title === '' || !title)
            alert('제목을 작성해주세요.');
        else if(content === '' || !content)
            alert('내용을 작성해주세요');
        else {
            try {
                const res = await postBoardReply(id, {
                    title: values.title,
                    content: values.content,
                });

                const replyId = res.data.content;

                navigate(`/board/${replyId}`)
            }catch(err) {
                console.error('Failed post reply: ', err);
            }
        }
    }

    const handleOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        });
    };

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

export default BoardReplyPage;