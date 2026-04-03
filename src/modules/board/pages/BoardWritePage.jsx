import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

import BoardWriteForm from '../../../common/components/BoardWriteForm';
import Button from '../../../common/components/Button';

import { postBoard } from '../services/boardService';
import { handleLocationPathToLogin } from '../../../common/utils/locationPathUtils';

function BoardWritePage() {
    const [values, setValues] = useState({
        title: '',
        content: '',
    });
    const isLoggedIn = useSelector(state => state.member.loginStatus);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if(!isLoggedIn)
            handleLocationPathToLogin(pathname, navigate);
    }, [isLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const title = values.title;
        const content = values.content;

        if(title === '' || !title)
            alert('제목을 작성해주세요');
        else if(content === '' || !content)
            alert('내용을 작성해주세요');
        else {
            try {
                const res = await postBoard(values);
                const postId = res.data.content;
                navigate(`/board/${postId}`)
            }catch(err) {
                console.error('Failed post board: ', err);
            }
        }
    }

    const handleOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    };

    if(isLoggedIn){
        return(
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
}

export default BoardWritePage;