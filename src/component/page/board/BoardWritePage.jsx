import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import {axiosErrorHandling, boardAxios} from "../../../modules/customAxios";

import BoardWriteForm from './BoardWriteForm';
import Button from "../../ui/Button";
import {handleLocationPathToLogin} from "../../../modules/loginModule";

function BoardWritePage () {
    const [values, setValues] = useState({
        title: "",
        content: "",
    });
    const [userStatus, setUserStatus] = useState(null);
    const navigate = useNavigate();
    const loginStatus = useSelector(state => state.user);
    const { pathname } = useLocation();

    useEffect(() => {
        if(loginStatus === 'loggedIn')
            setUserStatus(true);
        else if(loginStatus === 'loggedOut')
            handleLocationPathToLogin(pathname, navigate);
    }, [loginStatus]);

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