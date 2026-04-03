import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from'../../../common/components/Button';
import { postJoin, checkId, checkNickname } from '../services/memberService';
import { imageValidation } from '../../../common/utils/imageUtils';
import { PATTERNS } from "../utils/patterns";
import {validateJoin, validateNicknameValue, validateUserIdValue} from '../utils/userValidator';
import { setJoinFormData } from '../utils/userFormDataUtils';
import {
    INFO_CHECK,
    USER_ID_INFO_CHECK_MESSAGE,
    PASSWORD_INFO_CHECK_MESSAGE,
    CHECK_PASSWORD_INFO_CHECK_MESSAGE,
    USER_NAME_INFO_CHECK_MESSAGE
} from "../constants/userInfoCheckConstants";

import MemberInfoOverlap from "../component/MemberInfoOverlap";
import MemberBasicInfo from "../component/MemberBasicInfo";

function Join() {
    const isLoggedIn = useSelector((state) => state.member.loginStatus);
    const [joinData, setJoinData] = useState({
        userId: '',
        userPw: '',
        checkPassword: '',
        userName: '',
        nickname: '',
        email: '',
        profile: '',
    });

    const [profileStatus, setProfileStatus] = useState('default');
    const [idCheck, setIdCheck] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [verifyPw, setVerifyPw] = useState('');
    const [nameCheck, setNameCheck] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState('');
    const [emailCheck, setEmailCheck] = useState('');
    const [emailProvider, setEmailProvider] = useState('naver');
    const [emailSuffix, setEmailSuffix] = useState(`${process.env.REACT_APP_EMAIL_SUFFIX_NAVER}`);
    const [checkInfo, setCheckInfo] = useState({
        idCheckInfo: false,
        pwCheckInfo: false,
        nicknameInfo: false
    });

    const idElem = useRef(null);
    const pwElem = useRef(null);
    const pwCheckElem = useRef(null);
    const userNameElem = useRef(null);
    const nicknameElem = useRef(null);
    const emailElem = useRef(null);

    const navigate = useNavigate();

    const idPattern = PATTERNS.USERID;
    const pwPattern = PATTERNS.PASSWORD;
    const nicknamePattern = PATTERNS.NICKNAME;
    const usernamePattern = PATTERNS.USERNAME;

    useEffect(() => {
        if(isLoggedIn)
            navigate('/')
    }, [isLoggedIn, navigate])

    const handleEmailSelectOnchange = (e) => {
        const val = e.target.value;
        setEmailProvider(val);
        let suffix;

        if(val === 'naver')
            suffix = process.env.REACT_APP_EMAIL_SUFFIX_NAVER;
        else if(val === 'daum')
            suffix = process.env.REACT_APP_EMAIL_SUFFIX_DAUM;

        setEmailSuffix(suffix || '');
    }

    const handleEmailSuffixInputOnChange = (e) => {
        const val = e.target.value;

        setEmailSuffix(val);
    }

    const handleCheckId = async () => {
        const idValueValidationResult = validateUserIdValue(joinData.userId);

        if(!idValueValidationResult) {
            try {
                await checkId(joinData.userId);

                setCheckInfo({
                    ...checkInfo,
                    idCheckInfo: true,
                });
                setIdCheck(INFO_CHECK.VALID);
            }catch(err) {
                console.log('checkId error: ', err);
                if(err.status === 409) {
                    setCheckInfo({
                        ...checkInfo,
                        idCheckInfo: false,
                    });
                    setIdCheck(INFO_CHECK.DUPLICATED)
                }else
                    setIdCheck(INFO_CHECK.ERROR);
            }
        }else {
            setIdCheck(idValueValidationResult.checkValue);
            idElem.current.focus();
        }
    }

    const handleCheckNickname = async () => {
        const nicknameValueValidationResult = validateNicknameValue(joinData.nickname);

        if(!nicknameValueValidationResult) {
            try {
                await checkNickname(joinData.nickname);

                setCheckInfo({
                    ...checkInfo,
                    nicknameInfo: true,
                });
                setNicknameCheck(INFO_CHECK.VALID);
            }catch(err) {
                console.log('checkNickname error: ', err);
                if(err.status === 409) {
                    setCheckInfo({
                        ...checkInfo,
                        nicknameInfo: false,
                    });
                    setNicknameCheck(INFO_CHECK.DUPLICATED);
                }else
                    setNicknameCheck(INFO_CHECK.ERROR);
            }
        }else {
            setNicknameCheck(nicknameValueValidationResult.checkValue);
            nicknameElem.current.focus();
        }

    }

    const handleSubmit = async () => {
        const validationResult = validateJoin(checkInfo, joinData, emailSuffix);

        if(!validationResult.length){
            try {
                const formData = setJoinFormData(joinData, emailSuffix);

                await postJoin(formData);

                navigate('/login');
            }catch(err) {
                if(err.response?.data.code === 400) {
                    alert(err.response?.data.message);
                }else
                    alert('오류가 발생했습니다.\n문제가 계속되면 관리자에게 문의해주세요.');
            }
        }else {
            invalidFocus(validationResult);
        }
    }

    const invalidFocus = (validationErrors) => {
        if(!validationErrors.length) return;

        validationErrors.forEach(({ field, checkValue, defaultMessage }) => {
            const setters = {
                userId: setIdCheck,
                password: setPwCheck,
                userName: setNameCheck,
                nickname: setNicknameCheck,
                email: setEmailCheck,
            };

            if(setters[field])
                setters[field](defaultMessage || checkValue);
        })

        const firstError = validationErrors[0];
        const refs = {
            userId: idElem,
            userPW: pwElem,
            userName: userNameElem,
            nickname: nicknameElem,
            email: emailElem,
        }

        refs[firstError.field]?.current?.focus();
    }

    const handleInputOnChange = (e) => {
        setJoinData({
            ...joinData,
            [e.target.name]: e.target.value,
        });

        const targetName = e.target.name;

        if(targetName === 'userId'){
            setCheckInfo({
                ...checkInfo,
                idCheckInfo: false,
            });
        }else if(targetName === 'userPw') {
            const pwValue = e.target.value;
            if(pwValue.length < 8)
                setPwCheck(INFO_CHECK.SHORT);
            else if(!pwPattern.test(pwValue))
                setPwCheck(INFO_CHECK.INVALID);
            else
                setPwCheck(INFO_CHECK.VALID);

            if(pwValue === joinData.checkPassword){
                setCheckInfo({
                    ...checkInfo,
                    pwCheckInfo: true,
                });
                setVerifyPw(INFO_CHECK.VALID);
            }else {
                setCheckInfo({
                    ...checkInfo,
                    pwCheckInfo: false,
                });
                setVerifyPw(INFO_CHECK.INVALID);
            }
        }else if(targetName === 'checkPassword') {
            const checkPwValue = e.target.value;
            if(joinData.userPw === checkPwValue){
                setCheckInfo({
                    ...checkInfo,
                    pwCheckInfo: true,
                });
                setVerifyPw(INFO_CHECK.VALID);
            }else {
                setCheckInfo({
                    ...checkInfo,
                    pwCheckInfo: false,
                });
                setVerifyPw(INFO_CHECK.INVALID);
            }
        }else if(targetName === 'userName') {
            const nameValue = e.target.value;
            if(nameValue !== '')
                setNameCheck('');
        }else if(targetName === 'nickname') {
            setCheckInfo({
                ...checkInfo,
                nicknameInfo: false,
            })
        }
    };

    const handleProfileOnChange = (e) => {
        if(e.target.files.length && imageValidation(e)){
            const file = e.target.files[0];

            setJoinData({
                ...joinData,
                profile: file,
            })

            setProfileStatus('file');
        }
    }

    const handleProfileDeleteOnClick = () => {
        window.URL.revokeObjectURL(joinData.profile);
        setJoinData({
            ...joinData,
            profile: '',
        });
        setProfileStatus('default');
    }

    return (
        <div className="container">
            <div className="layer">
                <div className="mb-2">
                    <label><span className="join_essential">*</span>아이디</label>
                    <input
                        type={'text'}
                        name={'userId'}
                        placeholder={'아이디'}
                        onChange={handleInputOnChange}
                        ref={idElem}
                    />
                    <Button
                        btnText={'중복체크'}
                        onClick={handleCheckId}
                    />
                    <UserIdOverlap
                        checkValue={idCheck}
                    />
                </div>
                <div className="mb-2">
                    <label className={'mr-3 mb-2'}><span className="join_essential">*</span>비밀번호</label>
                    <input
                        type={'password'}
                        name={'userPw'}
                        placeholder={'비밀번호'}
                        onChange={handleInputOnChange}
                        ref={pwElem}
                    />
                    <PasswordOverlap
                        checkValue={pwCheck}
                    />
                </div>
                <div className="mb-2">
                    <label className="mr-3 mb2"><span className="join_essential">*</span>비밀번호 확인</label>
                    <input
                        type={'password'}
                        name={'checkPassword'}
                        placeholder={'비밀번호'}
                        onChange={handleInputOnChange}
                        ref={pwCheckElem}
                    />
                    <CheckPasswordOverlap
                        checkValue={verifyPw}
                    />
                </div>
                <div className="mb-2">
                    <label className="mr-5 mb2"><span className="join_essential">*</span>이름</label>
                    <input
                        type={'text'}
                        name={'userName'}
                        placeholder={'이름'}
                        onChange={handleInputOnChange}
                        ref={userNameElem}
                    />
                    <UserNameOverlap
                        checkValue={nameCheck}
                    />
                </div>
                <MemberBasicInfo
                    joinData={joinData}
                    handleOnChange={handleInputOnChange}
                    nicknameElem={nicknameElem}
                    emailElem={emailElem}
                    handleCheckNickname={handleCheckNickname}
                    nicknameCheck={nicknameCheck}
                    emailProvider={emailProvider}
                    handleEmailSuffixInputChange={handleEmailSuffixInputOnChange}
                    handleEmailSelectOnChange={handleEmailSelectOnchange}
                    emailCheck={emailCheck}
                    profileStatus={profileStatus}
                    handleProfileOnChange={handleProfileOnChange}
                    handleProfileDeleteOnClick={handleProfileDeleteOnClick}
                />
                <Button
                    btnText={'가입'}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}

function UserIdOverlap(props) {
    const { checkValue } = props;

    let overlapText = USER_ID_INFO_CHECK_MESSAGE(checkValue);

    return (
        <MemberInfoOverlap overlapText={overlapText}/>
    )
}

function PasswordOverlap(props) {
    const { checkValue } = props;

    let overlapText = PASSWORD_INFO_CHECK_MESSAGE(checkValue);

    return (
        <MemberInfoOverlap
            overlapText={overlapText}
        />
    )
}

function CheckPasswordOverlap(props) {
    const { checkValue } = props;

    let overlapText = CHECK_PASSWORD_INFO_CHECK_MESSAGE(checkValue);

    return (
        <MemberInfoOverlap
            overlapText={overlapText}
        />
    )
}

function UserNameOverlap(props) {
    const { checkValue } = props;

    let overlapText = USER_NAME_INFO_CHECK_MESSAGE(checkValue);

    return (
        <MemberInfoOverlap
            overlapText={overlapText}
        />
    )
}

export default Join;