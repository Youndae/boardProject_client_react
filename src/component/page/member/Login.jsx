import React, { useState } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import styled from "styled-components";
import {useDispatch} from "react-redux";

import Button from "../../ui/Button";

import {memberAxios, axiosErrorHandling} from "../../../modules/customAxios";

const OAuthBtn = styled.img`
    width: 200px;
`

const OAuthDiv = styled.div`
    margin-top: 20px;
`

function Login() {
    const [values, setValues] = useState({
        userId: "",
        userPw: "",
    });

    const { state } = useLocation();

    /*
        id : id 미입력
        pw : 비밀번호 미입력
        fail : 로그인 실패
     */
    const [responseStatus, setResponseStatus] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const googleLogin = (e) => {
        window.sessionStorage.setItem('prev', state);
        window.location.href = 'http://localhost:8080/oauth2/authorization/google'
    }

    const naverLogin = (e) => {
        window.sessionStorage.setItem('prev', state);
        window.location.href = 'http://localhost:8080/oauth2/authorization/naver'
    }

    const kakaoLogin = (e) => {
        window.sessionStorage.setItem('prev', state);
        window.location.href = 'http://localhost:8080/oauth2/authorization/kakao'
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: [e.target.value],
        });
    }

    const handleKeyPress = (e) => {
        if(e.key === 'Enter')
            handleSubmit();
    }

    const handleSubmit = async (e) => {

        if(values.userId === '') {
            setResponseStatus('id');
        }else if(values.userPw === '') {
            setResponseStatus('pw');
        }else{
            //axios.post(login)
            let form = new FormData();
            form.append('userId', values.userId);
            form.append('userPw', values.userPw);

            const data = {
                userId: values.userId[0],
                userPw: values.userPw[0],
            };

            await memberAxios.post(`login`, data)
                .then(res => {
                    const body = {
                        type: 'isLoggedIn',
                    }

                    dispatch(body);

                    navigate(state);
                })
                .catch(err => {
                    const statusCode = err.response.status;

                    if(statusCode === 403)
                        setResponseStatus('fail');
                    else
                        axiosErrorHandling(err);
                })
        }
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
                        onKeyUp={handleKeyPress}
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
                        onKeyUp={handleKeyPress}
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
                <OAuthDiv className={'oAuth2'}>
                    <div className="oAuth2-google">
                        <label htmlFor={'oauth-google'}>
                            <OAuthBtn src={`${process.env.PUBLIC_URL}/img/web_light_sq_ctn@1x.png`}/>
                        </label>
                    </div>
                    <div className="oAuth2-naver">
                        <label htmlFor={'oauth-naver'}>
                            <OAuthBtn src={`${process.env.PUBLIC_URL}/img/btnG_official.png`}/>
                        </label>
                    </div>
                    <div className="oAuth2-kakao">
                        <label htmlFor={'oauth-kakao'}>
                            <OAuthBtn src={`${process.env.PUBLIC_URL}/img/kakao_login_medium_narrow.png`}/>
                        </label>
                    </div>
                    <button id={'oauth-google'} onClick={googleLogin} style={{display: 'none'}}/>
                    <button id={'oauth-naver'} onClick={naverLogin} style={{display: 'none'}}/>
                    <button id={'oauth-kakao'} onClick={kakaoLogin} style={{display: 'none'}}/>
                </OAuthDiv>
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