import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import {customAxios} from "../../../modules/customAxios";
import {useDispatch, useSelector} from "react-redux";


import Button from "../../ui/Button";


axios.defaults.withCredentials = true;

const member_default = process.env.REACT_APP_API_MEMBER;

function Login(props) {
    const [values, setValues] = useState({
        userId: "",
        userPw: "",
    });
    const isLoggedIn = useSelector(state => state);

    // const [cookies, setCookie, removeCookie] = useCookies(['Authorization', 'Authorization_ino', 'Authorization_refresh']);

    /*
        id : id 미입력
        pw : 비밀번호 미입력
        fail : 로그인 실패
     */
    const [responseStatus, setResponseStatus] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(isLoggedIn)
            navigate(`/`);
    })

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

        if(values.userId == '') {
            console.log("userId == blank");
            setResponseStatus('id');
        }else if(values.userPw == '') {
            console.log('userPw == blank');
            setResponseStatus('pw');
        }else{
            //axios.post(login)

            let response;

            let form = new FormData();
            form.append('userId', values.userId);
            form.append('userPw', values.userPw);
            console.log('id, pw : ', values.userId[0], values.userPw[0]);
            console.log('form : ', form);

            const data = {
                userId: values.userId[0],
                userPw: values.userPw[0],
            };

            await customAxios.post(`${member_default}login`, data)
                .then(res => {
                    console.log('res : ', res);
                    console.log('res.data : ', res.data);
                    const body = {
                        type: 'isLoggedIn',
                    }

                    dispatch(body);

                    // eslint-disable-next-line no-restricted-globals
                    location.href='/';
                })
                .catch(err => {
                    console.error('axios error : ', err);

                    const statusCode = err.response.status;

                    if(statusCode === 403)
                        setResponseStatus('fail');
                })



            /*response = await axios.post('http://localhost:9096/member/login2',
                data, {withCredentials: true})
                .then(res => {
                    console.log('res : ', res);
                    console.log('res.data : ', res.data);
                    // console.log('res.headers : ', res.headers["set-cookie"]);

                    const body = {
                        type: 'isLoggedIn'
                    }

                    dispatch(body);
                    // eslint-disable-next-line no-restricted-globals
                    // location.href='/';

                })
                .catch(err => {
                    console.error('axios error : ', err);

                    const statusCode = err.response.status;

                    if(statusCode === 403)
                        setResponseStatus('fail');
                    else
                        alert('오류가 발생했습니다.\n문제가 계속된다면 관리자에게 문의해주세요');
                });*/

            /*if(cookies.Authorization_ino == undefined){
                response = axios.post('http://localhost:9096/member/login', {
                    headers: {
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    userId: values.userId,
                    userPw: values.userPw
                });
            }else {
                response = axios.post('http://localhost:9096/member/login', form, {
                    headers: {
                        Cookie: `Authorization_ino=${cookies.Authorization_ino}`
                    }
                })
            }*/
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