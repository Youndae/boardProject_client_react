import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Button from "../../ui/Button";

function Login(props) {
    const [values, setValues] = useState({
        userId: "",
        userPw: "",
    });


    /*
        id : id 미입력
        pw : 비밀번호 미입력
        fail : 로그인 실패
     */
    const [responseStatus, setResponseStatus] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: [e.target.value],
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(values.userId == '') {
            console.log("userId == blank");
            setResponseStatus('id');
        }else if(values.userPw == '') {
            console.log('userPw == blank');
            setResponseStatus('pw');
        }else{
            //axios.post(login)
            setResponseStatus('fail');
        }

        console.log('handleSubmit');
    }

    return (
        <div className="container">
            <div className="layer">
                <h1>Login</h1>
                <div className="mb-2">
                    <label>아이디</label>
                    <input
                        type={"text"}
                        name={"userId"}
                        placeholder={"아이디"}
                        className={"form-control"}
                        onChange={handleChange}
                        required autoFocus
                    />
                </div>
                <div className="mb-2">
                    <label>비밀번호</label>
                    <input
                        type={"password"}
                        name={"userPw"}
                        placeholder={"비밀번호"}
                        className={"form-control"}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Overlap resValue={responseStatus}/>
                <div>
                    <Button
                        btnText={"로그인"}
                        onClick={handleSubmit}
                    />
                    <Button
                        btnText={"회원가입"}
                        onClick={() => {
                            navigate('/join')
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

const OverlapDiv = styled.div`
    color: red;
`

function Overlap(props) {
    const { resValue } = props;

    let overlapText = '';
    if(resValue === 'id')
        overlapText = '아이디를 입력해주세요';
    else if(resValue === 'pw')
        overlapText = '비밀번호를 입력해주세요';
    else if(resValue === 'fail')
        overlapText = '아이디 또는 비밀번호가 일치하지 않습니다';

    return (
        <OverlapDiv>
            {overlapText}
        </OverlapDiv>
    )
}

export default Login;