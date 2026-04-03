import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";

import Button from '../../../common/components/Button';
import { responseInterceptor } from "../../../common/utils/axios/axiosInterceptor";
import { login } from '../memberSlice';

import {
    postLogin,
} from '../services/memberService';

const OAuthBtn = styled.img`
    width: 200px;
`

const OAuthDiv = styled.div`
    margin-top: 20px;
`

function Login() {
    const [values, setValues] = useState({
        userId: '',
        password: '',
    });
    const [cookies, setCookie] = useCookies(['redirect_to']);
    const { state } = useLocation();
    const isLoggedIn = useSelector((state) => state.member.loginStatus);
    const [overlapStatus, setOverlapStatus] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(isLoggedIn)
            navigate('/');
    }, [isLoggedIn, state]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(values.userId === '')
            setOverlapStatus('id');
        else if(values.password === '')
            setOverlapStatus('pw');
        else {
            try {
                const res = await postLogin(values);
                dispatch(login(res));
                navigate(state);
            }catch(err) {
                console.error('login error: ', err);

                const status = err.status;
                const message = err.message;
                if((status === 401 && message === 'UNAUTHORIZED') || status === 403)
                    setOverlapStatus('fail');
                else
                    await responseInterceptor(err);
            }
        }
    }

    const handleInputEnterKey = (e) => {
        if(e.key === 'Enter')
            handleSubmit(e);
    }

    const handleInputOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleOAuth = (e) => {
        const oAuthClient = e.target.name;
        const targetUrl = state?.toString() || '/';

        setCookie('redirect_to', targetUrl, {
            path: '/',
            maxAge: 60,
            sameSite: 'lax'
        });

        if(oAuthClient === 'google')
            window.location.href='http://localhost:8080/oauth2/authorization/google';
        else if(oAuthClient === 'naver')
            window.location.href='http://localhost:8080/oauth2/authorization/naver';
        else if(oAuthClient === 'kakao')
            window.location.href='https://localhost:8080/oauth2/authorization/kakao';
    }

    return (
        <div className="container">
            <div className="layer">
                <h1>Login</h1>
                <div className="mb-2">
                    <label>아이디</label>
                    <input
                        type={'text'}
                        name={'userId'}
                        placeholder={'아이디'}
                        className={'form-control'}
                        onChange={handleInputOnChange}
                        onKeyUp={handleInputEnterKey}
                        required
                        autoFocus
                    />
                </div>
                <div className="mb-2">
                    <label>비밀번호</label>
                    <input
                        type={'password'}
                        name={'password'}
                        placeholder={'비밀번호'}
                        className={'form-control'}
                        onChange={handleInputOnChange}
                        onKeyUp={handleInputEnterKey}
                        required
                    />
                </div>
                <Overlap resValue={overlapStatus}/>
                <div>
                    <Button
                        btnText={'로그인'}
                        onClick={handleSubmit}
                    />
                    <Button
                        btnText={'회원가입'}
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
                    <button id={'oauth-google'} name={'google'} onClick={handleOAuth} style={{display: 'none'}}/>
                    <button id={'oauth-naver'} name={'naver'} onClick={handleOAuth} style={{display: 'none'}}/>
                    <button id={'oauth-kakao'} name={'kakao'} onClick={handleOAuth} style={{display: 'none'}}/>
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