import React, {useEffect, useRef, useState} from 'react';

import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";

import MemberBasicInfo from "../component/MemberBasicInfo";
import Button from '../../../common/components/Button';

import { getProfile, patchProfile, checkNickname } from '../services/memberService';
import { handleLocationPathToLogin } from '../../../common/utils/locationPathUtils';
import {validateModifyProfile, getEmail, validateNickname, validateNicknameValue} from "../utils/userValidator";
import {INFO_CHECK} from "../constants/userInfoCheckConstants";
import {imageValidation} from "../../../common/utils/imageUtils";

function UpdateProfile() {
    const isLoggedIn = useSelector((state) => state.member.loginStatus);
    const [userData, setUserData] = useState({
        nickname: '',
        email: '',
        profile: '',
    });
    const [emailProvider, setEmailProvider] = useState('naver');
    const [emailSuffix, setEmailSuffix] = useState(`${process.env.REACT_APP_EMAIL_SUFFIX_NAVER}`);
    const [emailCheck, setEmailCheck] = useState('');
    const [nicknameCheck, setNicknameCheck] = useState('');
    const [nicknameCheckInfo, setNicknameCheckInfo] = useState(false);
    const [profileStatus, setProfileStatus] = useState('default');
    const nicknameElem = useRef(null);
    const emailElem = useRef(null);
    const [deleteProfile, setDeleteProfile] = useState('');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn)
            handleLocationPathToLogin(pathname, navigate);
        else {
            getMemberProfile();
        }
    }, [isLoggedIn, pathname]);

    const getMemberProfile = async  () => {
        try {
            const res = await getProfile();
            const responseData = res.data.content;

            setUserData({
                nickname: responseData.nickname,
                profile: responseData.profile,
                email: responseData.mailPrefix,
            });

            setEmailProvider(responseData.mailType);
            setEmailSuffix(responseData.mailSuffix);

        }catch(err) {
            console.error('Failed get user info', err);
        }
    }

    const handleSubmit = async () => {
        const validationResult = validateModifyProfile(nicknameCheckInfo, userData, emailSuffix);

        if(!validationResult.length) {
            try {
                const userEmail = getEmail(userData, emailSuffix);
                const formData = new FormData();
                formData.append('nickname', userData.nickname);
                formData.append('email', userEmail);
                if(userData.profile)
                    formData.append('profile', userData.profile);
                if(deleteProfile)
                    formData.append('deleteProfile', deleteProfile);

                await patchProfile(formData);
            }catch(err) {
                console.error('Failed patch profile: ', err);
            }
        }else {
            invalidFocus(validationResult);
        }
    }

    const invalidFocus = (validationErrors) => {
        if(!validationErrors.length) return;

        validationErrors.forEach(({ field, checkValue, defaultMessage }) => {
            const setters = {
                nickname: setNicknameCheck,
                email: setEmailCheck,
            };

            if(setters[field])
                setters[field](defaultMessage || checkValue);
        })

        const firstError = validationErrors[0];
        const refs = {
            nickname: nicknameElem,
            email: emailElem,
        }

        refs[firstError.field]?.current?.focus();
    }

    const handleInputOnChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })

        if(e.target.name === 'nickname')
            setNicknameCheckInfo(false);
    }

    const handleCheckNickname = async () => {
        const nicknameValueValidationResult = validateNicknameValue(userData.nickname);

        if(!nicknameValueValidationResult) {
            try {
                await checkNickname(userData.nickname);
                setNicknameCheckInfo(true);
                setNicknameCheck(INFO_CHECK.VALID);
            }catch (err) {
                console.log('checkNickname error: ', err);
                if(err.status === 409) {
                    setNicknameCheckInfo(false);
                    setNicknameCheck(INFO_CHECK.DUPLICATED);
                }else {
                    setNicknameCheckInfo(false);
                    setNicknameCheck(INFO_CHECK.ERROR);
                }
            }
        }else {
            setNicknameCheck(nicknameValueValidationResult.checkValue);
            nicknameElem.current.focus();
        }
    }

    const handleProfileDeleteOnClick = () => {
        if(profileStatus === 'old')
            setDeleteProfile(userData.profile);
        else
            window.URL.revokeObjectURL(userData.profile);

        setUserData({
            ...userData,
            profile: '',
        });

        setProfileStatus('default');
    }

    const handleProfileOnChange = (e) => {
        if(e.target.files.length && imageValidation(e)){
            const file = e.target.files[0];

            setUserData({
                ...userData,
                profile: file,
            })

            setProfileStatus('new');
        }
    }

    const handleEmailSelectOnchange = (e) => {
        const val = e.target.value;
        setEmailProvider(val);
        let suffix;

        if(val === 'naver')
            suffix = process.env.REACT_APP_EMAIL_SUFFIX_NAVER;
        else if(val === 'daum')
            suffix = process.env.REACT_APP_EMAIL_SUFFIX_DAUM;
        else if(val === 'gmail')
            suffix = process.env.REACT_APP_EMAIL_SUFFIX_GMAIL;

        setEmailSuffix(suffix || '');
    }

    const handleEmailSuffixInputOnChange = (e) => {
        const val = e.target.value;

        setEmailSuffix(val);
    }

    if(isLoggedIn) {
        return (
            <div className="container">
                <div className="layer">
                    <MemberBasicInfo
                        joinData={userData}
                        handleOnChange={handleInputOnChange}
                        nicknameElem={nicknameElem}
                        emailElem={emailElem}
                        handleCheckNickname={handleCheckNickname}
                        nicknameCheck={nicknameCheck}
                        emailProvider={emailProvider}
                        handleEmailSuffixInputChange={handleEmailSuffixInputOnChange}
                        handleEmailSelectOnChange={handleEmailSelectOnchange}
                        emailSuffix={emailSuffix}
                        emailCheck={emailCheck}
                        profileStatus={profileStatus}
                        handleProfileOnChange={handleProfileOnChange}
                        handleProfileDeleteOnClick={handleProfileDeleteOnClick}
                    />
                    <Button
                        btnText={'수정'}
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        )
    }
}

export default UpdateProfile;