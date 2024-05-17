import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import Button from "../../ui/Button";
import {axiosErrorHandling, memberAxios, memberProfileAxios} from "../../../modules/customAxios";
import {imageValidation} from "../../../modules/imageModule";

import Overlap from "../../ui/Overlap";
import MemberProfileImage from "../../ui/MemberProfileImage";
import MemberNickname from "../../ui/MemberNickname";
import {setJoinFormData} from "../../../modules/loginModule";

import './join.css';
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
        nickname: '',
        email: '',
        profileThumbnail: '',
    });


    const [profileImg, setProfileImg] = useState('');
    const [profileStatus, setProfileStatus] = useState('default');
    const [idCheck, setIdCheck] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [verifyPw, setVerifyPw] = useState('');
    const [nameCheck, setNameCheck] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState('');
    const [emailCheck, setEmailCheck] = useState('');
    const [emailProvider, setEmailProvider] = useState('naver');
    const [emailSuffix, setEmailSuffix] = useState(`${process.env.REACT_APP_EMAIL_SUFFIX_NAVER}`);
    console.log('eamil suffix : ', emailSuffix);

    //아이디 체크와 비밀번호 체크가 정상인지
    const [checkInfo, setCheckInfo] = useState({
        idCheckInfo: false,
        pwCheckInfo: false,
        nicknameCheckInfo: false,
    });


    const idElem = useRef(null);
    const pwElem = useRef(null);
    const pwCheckElem = useRef(null);
    const userNameElem = useRef(null);
    const nicknameElem = useRef(null);
    const emailElem = useRef(null);

    const navigate = useNavigate();

    const idPattern = /^[A-Za-z0-9]{5,15}$/;
    const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,16}$/;
    const emailPattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    const handleEmailSelectOnChange = (e) => {
        const val = e.target.value;
        console.log('select val : ', val);
        setEmailProvider(val);
        let suffix = '';

        if(val === 'naver')
            suffix = process.env.REACT_APP_EMAIL_SUFFIX_NAVER;
        else if(val === 'daum')
            suffix = process.env.REACT_APP_EMAIL_SUFFIX_DAUM;

        setEmailSuffix(suffix);
    }

    const handleEmailSuffixInputChange = (e) => {
        const val = e.target.value;

        setEmailSuffix(val);
    }



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

    const handleCheckNickname = () => {
        if(userData.nickname === '')
            setNicknameCheck('empty');
        else{
            memberAxios.get(`check-nickname?nickname=${userData.nickname}`)
                .then(res => {
                    if(res.data === 1) {
                        setCheckInfo({
                            ...checkInfo,
                            'nicknameCheckInfo': false,
                        });
                        setNicknameCheck('duplication');
                    }else {
                        setCheckInfo({
                            ...checkInfo,
                            'nicknameCheckInfo': true,
                        });
                        setNicknameCheck('valid');
                    }
                })
                .catch(() => {
                    setNicknameCheck('err');
                })
        }
    }

    const handleJoin = () => {

        const userEmail = userData.email + '@' + emailSuffix;

        console.log('handle submit email : ', userEmail);

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
        }else if(userData.nickname === ''){
            setNicknameCheck('empty');
            nicknameElem.current.focus();
        }else if(!checkInfo.nicknameCheckInfo) {
            setNicknameCheck('notDuplicateCheck');
            nicknameElem.current.focus();
        }else if(!emailPattern.test(userEmail)) {
            setEmailCheck('invalid');
            emailElem.current.focus();
        }else {
            /*const body = {
                userId: userData.userId,
                userPw: userData.userPw,
                userName: userData.userName,
                nickname: userData.nickname,
                email: userEmail,
                profileThumbnail: userData.profileThumbnail,
            }*/

            const formData = setJoinFormData(userData, userEmail);

            memberProfileAxios.post('join', formData)
                .then(() => {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/login');
                })
                .catch(err => {
                    axiosErrorHandling(err);
                })


            /*memberAxios.post(`join`, body)
                .then(() => {
                    alert('회원가입이 완료되었습니다.');
                    navigate('/login');
                })
                .catch(err => {
                    axiosErrorHandling(err);
                })*/
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
        }else if(targetName === 'nickname') {

            setCheckInfo({
                ...checkInfo,
                nicknameCheckInfo: false,
            })
        }
    };

    const handleProfileOnChange = (e) => {
        if(e.target.files.length != 0){
            if(imageValidation(e)){
                const file = e.target.files[0];
                setUserData({
                    ...userData,
                    profileThumbnail: file,
                });

                setProfileImg(file);
            }
            setProfileStatus('file');
        }
    }

    const handleProfileDeleteOnClick = () => {
        window.URL.revokeObjectURL(profileImg);
        setUserData({
            ...userData,
            profileThumbnail: '',
        });
        setProfileImg('');
        setProfileStatus('default');
    }

    return (
        <div className="container">
            <div className="layer">
                    <div className="mb-2">
                        <label><span className={'join_essential'}>*</span>아이디</label>
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
                        <label className="mr-3 mb-2"><span className={'join_essential'}>*</span>비밀번호</label>
                        <input type={"password"} name={"userPw"} placeholder={"비밀번호"} onChange={handleChange} ref={pwElem}/>
                        <PwOverlap
                            checkValue={pwCheck}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mr-3 mb-2"><span className={'join_essential'}>*</span>비밀번호 확인</label>
                        <input type={"password"} name={"checkPassword"} placeholder={"비밀번호"} onChange={handleChange} ref={pwCheckElem}/>
                        <CheckPwOverlap
                            checkValue={verifyPw}
                        />
                    </div>
                    <div className="mb-2">
                        <label className="mr-5 mb-2"><span className={'join_essential'}>*</span>이름</label>
                        <input type={"text"} name={"userName"} placeholder={"이름"} onChange={handleChange} ref={userNameElem}/>
                        <UserNameOverlap
                            checkValue={nameCheck}
                        />
                    </div>
                    <MemberNickname
                        nickname={userData}
                        handleChange={handleChange}
                        nicknameElem={nicknameElem}
                        handleCheckNickname={handleCheckNickname}
                        nicknameCheck={nicknameCheck}
                    />
                    <div className="mb-2">
                        <label className="mr-5 mb-2"><span className={'join_essential'}>*</span>이메일</label>
                        <input type={'text'} name={'email'} placeholder={'이메일'} onChange={handleChange} ref={emailElem} />
                        <span>@</span>
                        <EmailProvider providerStatus={emailProvider} handleInputChange={handleEmailSuffixInputChange}/>
                        <select className={'email-select'} name={'email-suffix'} onChange={handleEmailSelectOnChange} defaultValue={'naver'}>
                            <option value={'naver'}>네이버</option>
                            <option value={'daum'}>다음</option>
                            <option value={''}>직접입력</option>
                        </select>
                        <EmailOverlap
                            checkValue={emailCheck}
                        />
                    </div>
                    <MemberProfileImage
                        profileImg={profileImg}
                        profileStatus={profileStatus}
                        handleProfileDeleteOnClick={handleProfileDeleteOnClick}
                        handleProfileOnChange={handleProfileOnChange}
                    />
                    <Button btnText={"가입"} onClick={handleJoin}/>
            </div>
        </div>
    )
}

function EmailProvider (props) {
    const { providerStatus, handleInputChange } = props;

    if(providerStatus === ''){
        return (
            <input type={'text'} name={'email-suffix-input'} onChange={handleInputChange}/>
        )
    }else{
        return null;
    }
}

function EmailOverlap (props) {
    const { checkValue } = props;

    let overlapText = '';

    if(checkValue === 'invalid')
        overlapText = '유효하지 않은 이메일 주소입니다.';

    return (
        <Overlap
            overlapText={overlapText}
        />
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
        <Overlap
            overlapText={overlapText}
        />
    )
}

function PwOverlap(props) {
    const { checkValue } = props;

    let overlapText = '';
    if(checkValue === 'empty')
        overlapText = '비밀번호를 입력하세요';
    else if(checkValue === 'invalid')
        overlapText = '비밀번호는 영어, 특수문자, 숫자가 포함되어야 합니다.';
    else if(checkValue === 'valid')
        overlapText = '사용가능한 비밀번호입니다';
    else if(checkValue === 'short')
        overlapText = '비밀번호는 8자리 이상이어야 합니다'

    return (
        <Overlap
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
        <Overlap
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
        <Overlap
            overlapText={overlapText}
        />
    )
}

export default Join;