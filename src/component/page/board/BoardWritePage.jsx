import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {axiosErrorHandling, boardAxios, memberAxios} from "../../../modules/customAxios";

import BoardWriteForm from './BoardWriteForm';
import Button from "../../ui/Button";

function BoardWritePage () {
    const [values, setValues] = useState({
        title: "",
        content: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        await memberAxios.get(`check-login`)
            .then(res => {
                const status = res.data.loginStatus;
                if(status === false){
                    const body = {
                        type: 'isLoggedOut',
                    }
                    dispatch(body);
                    window.location.href = '/login';
                }
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await boardAxios.post(``, {
            boardTitle: values.title,
            boardContent: values.content,
        })
        .then(res => {
            const insertNo = res.data;
            navigate(`/board/${insertNo}`)
        })
        .catch(err => {
            axiosErrorHandling(err);
        });
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm values={values} handleChange={handleChange} />
                <Button
                    btnText="등록"
                />
            </form>
        </div>
    );
}

export default BoardWritePage;