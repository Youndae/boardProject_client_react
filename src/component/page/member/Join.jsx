import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import Button from "../../ui/Button";
import {axiosErrorHandling, memberAxios} from "../../../modules/customAxios";

/**
 * @state
 * 1. idCheck
 *      '' : default
 *      empty : 아이디 미입력
 *      invalid : 패턴에 맞지 않는 아이디
 *      duplication : 사용중인 아이디
 *      valid : 사용 가능한 아이디
 *      err : 오류
 *      notDuplicateCheck : 중복체크 하지 않은 아이디
 *
 * 2. pwCheck
 *      '' : default
 *      empty : 비밀번호 미입력
 *      short : 짧은 비밀번호
 *      invalid : 패턴에 맞지 않는 비밀번호
 *      valid : 사용 가능한 비밀번호
 *
 * 3. verifyPw
 *      '' : default
 *      empty: 비밀번호 확인 미입력
 *      invalid : 비밀번호와 불일치
 *      valid : 비밀번호와 일치
 *
 * 4. nameCheck
 *      '' : default
 *      empty: 이름 미입력
 */
function Join () {
    const [userData, setUserData] = useState({
        userId : "",
        userPw: "",
        checkPassword: "",
        userName: "",
    });
    const [idCheck, setIdCheck] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [verifyPw, setVerifyPw] = useState('');
    const [nameCheck, setNameCheck] = useState('');
    //아이디 체크와 비밀번호 체크가 정상인지
    const [checkInfo, setCheckInfo] = useState({
        idCheckInfo: false,
        pwCheckInfo: false,
    });
    const idElem = useRef(null);
    const pwElem = useRef(null);
    const pwCheckElem = useRef(null);
    const userNameElem = useRef(null);
    const navigate = useNavigate();

    const idPattern = /^[A-Za-z0-9]{5,15}$/;
    const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,16}$/;


    const handleCheckId = () => {
        if(userData.userId === '') {
            setIdCheck('empty');

        }else if(idPattern.test(userData.userId) === false) {
            setIdCheck('invalid');
        }else {
            memberAxios.get(`check-id?userId=${userData.userId}`)
                .then(res => {
                    if(res.data === 1){
                        setCheckInfo({
                            ...checkInfo,
                            'idCheckInfo': false,
                        });
                        setIdCheck('duplication');
                    }else{
                        setCheckInfo({
                            ...checkInfo,
                            'idCheckInfo': true,
                        });
                        setIdCheck('valid');
                    }
                })
                .catch(() => {
                    setIdCheck('err');
                })
        }
    }

    const handleJoin = () => {
        if(!checkInfo.idCheckInfo){
            //아이디 중복 체크 요청 overlap 출력 및 focus
            setIdCheck('notDuplicateCheck');
            idElem.current.focus();
        }else if(!checkInfo.pwCheckInfo){
            //비밀번호 확인 요청 overlap 출력 및 focus
            pwElem.current.focus();
        }else if(userData.userName === ''){
            //사용자 이름 입력 요청 overlap 출력 및 focus
            setNameCheck('empty');
            userNameElem.current.focus();
        }else {
            const body = {
                userId: userData.userId,
                userPw: userData.userPw,
                userName: userData.userName,
            }

            memberAxios.post(`join`, body)
                .then(() => {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/login');
                })
                .catch(err => {
                    axiosErrorHandling(err);
                })
        }
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });

        const targetName = e.target.name;

        if(targetName === 'userId'){
            //사용자 아이디가 변경되는 경우 checkInfo를 false로 설정
            setCheckInfo({
                ...checkInfo,
                idCheckInfo: false,
            });
        }else if(targetName === 'userPw'){
            const pwValue = e.target.value;
            if(pwValue.length < 8)
                setPwCheck('short');
            else if(pwPattern.test(pwValue) === false)
                setPwCheck('invalid');
            else if(pwValue.length > 8 && pwPattern.test(pwValue)) {
                setPwCheck('valid');
            }

            if(pwValue === userData.checkPassword){
                setCheckInfo({
                    ...checkInfo,
                    'pwCheckInfo': true,
                });
                setVerifyPw('valid');
            }else{
                setCheckInfo({
                    ...checkInfo,
                    'pwCheckInfo': false,
                });
                setVerifyPw('invalid');
            }
        }else if(targetName === 'checkPassword'){
            const pwValue = e.target.value;
            if(userData.userPw === pwValue) {
                setVerifyPw('valid');
                setCheckInfo({
                    ...checkInfo,
                    'pwCheckInfo': true,
                });
            }else if(userData.userPw !== pwValue) {
                setVerifyPw('invalid');
                setCheckInfo({
                    ...checkInfo,
                    'pwCheckInfo': false,
                });
            }
        }else if(targetName === 'userName'){
            const nameValue = e.target.value;
            if(nameValue !== '')
                setNameCheck('');
        }
    };

    return (
        <div className="container">
            <div className="layer">
                    <div className="mb-2">
                        <label>아이디</label>
                        <input type={"text"} name={"userId"} placeholder={"아이디"} onChange={handleChange} ref={idElem}/>
                        <Button
                            btnText={"중복체크"}
                            onClick={handleCheckId}
                        />
                        <IdOverlap
                            checkValue={idCheck}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mr-3 mb-2">비밀번호</label>
                        <input type={"password"} name={"userPw"} placeholder={"비밀번호"} onChange={handleChange} ref={pwElem}/>
                        <PwOverlap
                            checkValue={pwCheck}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mr-3 mb-2">비밀번호 확인</label>
                        <input type={"password"} name={"checkPassword"} placeholder={"비밀번호"} onChange={handleChange} ref={pwCheckElem}/>
                        <CheckPwOverlap
                            checkValue={verifyPw}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mr-5 mb-2">이름</label>
                        <input type={"text"} name={"userName"} placeholder={"이름"} onChange={handleChange} ref={userNameElem}/>
                        <UserNameOverlap
                            checkValue={nameCheck}
                        />
                    </div>
                    <Button btnText={"가입"} onClick={handleJoin}/>
            </div>
        </div>
    )
}

const OverlapDiv = styled.div`
    color: red;
`

function DefaultOverlap (props) {
    const { overlapText } = props;

    return (
        <OverlapDiv>
            {overlapText}
        </OverlapDiv>
    )
}

function IdOverlap(props) {
    const { checkValue } = props;

    let overlapText = '';
    if(checkValue === 'empty')
        overlapText = '아이디를 입력하세요';
    else if(checkValue === 'invalid')
        overlapText = '영문자와 숫자를 사용한 5 ~ 15 자리만 가능합니다';
    else if(checkValue === 'duplication')
        overlapText = '이미 사용중인 아이디입니다';
    else if(checkValue === 'valid')
        overlapText = '사용 가능한 아이디입니다';
    else if(checkValue === 'err')
        overlapText = '오류가 발생했습니다. 문제가 계속되면 문의해주세요';
    else if(checkValue === 'notDuplicateCheck')
        overlapText = '아이디 중복 체크를 해주세요';


    return (
        <DefaultOverlap
            overlapText={overlapText}
        />
    )
}

function PwOverlap(props) {
    const { checkValue } = props;

    let overlapText = '';
    if(checkValue === 'empty')
        overlapText = '비밀번호를 입력하세요';
    else if(checkValue === 'short')
        overlapText = '비밀번호는 8자리 이상이어야 합니다'
    else if(checkValue === 'invalid')
        overlapText = '비밀번호는 영어, 특수문자, 숫자가 포함되어야 합니다.';
    else if(checkValue === 'valid')
        overlapText = '사용가능한 비밀번호입니다';

    return (
        <DefaultOverlap
            overlapText={overlapText}
        />
    )
}

function CheckPwOverlap(props) {
    const { checkValue } = props;

    let overlapText = '';
    if(checkValue === 'invalid' || checkValue === 'empty')
        overlapText = '비밀번호가 일치하지 않습니다.';

    return (
        <DefaultOverlap
            overlapText={overlapText}
        />
    )
}

function UserNameOverlap(props) {
    const { checkValue } = props;

    let overlapText = '';
    if(checkValue === 'empty')
        overlapText = '이름을 입력해주세요';

    return (
        <DefaultOverlap
            overlapText={overlapText}
        />
    )
}

export default Join;