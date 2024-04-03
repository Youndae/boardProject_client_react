import React, { useEffect, useState, useRef } from 'react';
import Button from "../../ui/Button";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const idPattern = /^[A-Za-z0-9]{5,15}$/;
const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,16}$/;


function Join () {
    const [userData, setUserData] = useState({
        userId : "",
        userPw: "",
        checkPassword: "",
        userName: "",
    });
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state);

    /*
        '' : default
        empty : 아이디 미입력
        invalid : 패턴에 맞지 않는 아이디
        duplication : 사용중인 아이디
        valid : 사용 가능한 아이디
        err : 오류
        notDuplicateCheck : 중복체크 하지 않은 아이디
     */
    const [idCheck, setIdCheck] = useState('');
    /*
        '' : default
        empty : 비밀번호 미입력
        short : 짧은 비밀번호
        invalid : 패턴에 맞지 않는 비밀번호
        valid : 사용 가능한 비밀번호
     */
    const [pwCheck, setPwCheck] = useState('');
    /*
        '' : default
        empty: 비밀번호 확인 미입력
        invalid : 비밀번호와 불일치
        valid : 비밀번호와 일치
     */
    const [verifyPw, setVerifyPw] = useState('');
    //아이디 체크와 비밀번호 체크가 정상인지
    const [checkInfo, setCheckInfo] = useState({
        idCheckInfo: false,
        pwCheckInfo: false,
    });

    useEffect(() => {
        if(isLoggedIn)
            navigate(`/`);
    })

    const handleCheckId = (e) => {
        console.log('checkId');
        /*
            axios.post 아이디 체크 후
            정상이라면 setIdCheck
         */

        if(userData.userId === '') {
            setIdCheck('empty');

        }else if(idPattern.test(userData.userId) == false) {
            setIdCheck('invalid');
        }else {
            //axios.post 아이디 체크
            //결과에 따른 setIdCheck

            const uid = 'coco1234';

            if (userData.userId === uid){
                setCheckInfo({
                    ...checkInfo,
                    'idCheckInfo': false,
                });
                setIdCheck('duplication');
            }else {
                setCheckInfo({
                    ...checkInfo,
                    'idCheckInfo': true,
                });
                setIdCheck('valid');
            }
        }


    }

    const handleJoin = () => {
        //axios.post(join)
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });

        const targetName = e.target.name;

        if(targetName === 'userPw'){
            const pwValue = e.target.value;
            if(pwValue.length < 8)
                setPwCheck('short');
            else if(pwPattern.test(pwValue) == false)
                setPwCheck('invalid');
            else if(pwValue.length > 8 && pwPattern.test(pwValue)) {
                console.log("valid pw");
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
        }
    };

    return (
        <div className="container">
            <div className="layer">

                    <div className="mb-2">
                        <label>아이디</label>
                        <input type={"text"} name={"userId"} placeholder={"아이디"} onChange={handleChange}/>
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
                        <input type={"password"} name={"userPw"} placeholder={"비밀번호"} onChange={handleChange}/>
                        <PwOverlap
                            checkValue={pwCheck}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mr-3 mb-2">비밀번호 확인</label>
                        <input type={"password"} name={"checkPassword"} placeholder={"비밀번호"} onChange={handleChange}/>
                        <CheckPwOverlap
                            checkValue={verifyPw}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mr-5 mb-2">이름</label>
                        <input type={"text"} name={"userName"} placeholder={"이름"} onChange={handleChange}/>
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
};

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



export default Join;