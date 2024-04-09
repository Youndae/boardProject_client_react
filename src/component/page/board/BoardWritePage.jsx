import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {axiosErrorHandling, boardAxios, checkUserStatus} from "../../../modules/customAxios";

import BoardWriteForm from './BoardWriteForm';
import Button from "../../ui/Button";

function BoardWritePage () {
    const [values, setValues] = useState({
        title: "",
        content: "",
    });
    const [userStatus, setUserStatus] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        checkUserStatus()
            .then(res => {
                console.log('checkUser res : ', res);
                const status = res.data.loginStatus;

                if(status){
                    setUserStatus(true);
                }else {
                    const body = {
                        type: 'isLoggedOut',
                    }
                    dispatch(body);
                    window.location.href = '/login';
                }
            });
    }, []);

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

    if(userStatus) {
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
}

export default BoardWritePage;