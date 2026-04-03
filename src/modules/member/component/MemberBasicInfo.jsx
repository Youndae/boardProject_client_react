import React from 'react';

import MemberProfileImage from './MemberProfileImage';
import MemberNicknameForm from './MemberNicknameForm';
import MemberEmailForm from "./MemberEmailForm";

import '../style/join.css';

function MemberBasicInfo(props) {
    const {
        joinData,
        handleOnChange,
        nicknameElem,
        emailElem,
        handleCheckNickname,
        nicknameCheck,
        emailProvider,
        handleEmailSuffixInputChange,
        handleEmailSelectOnChange,
        emailSuffix,
        emailCheck,
        profileStatus,
        handleProfileOnChange,
        handleProfileDeleteOnClick,
    } = props;

    return (
        <>
            <MemberNicknameForm
                nicknameValue={joinData.nickname}
                handleOnChange={handleOnChange}
                nicknameElem={nicknameElem}
                handleCheckNickname={handleCheckNickname}
                nicknameCheck={nicknameCheck}
            />
            <MemberEmailForm
                emailValue={joinData.email}
                handleOnChange={handleOnChange}
                emailElem={emailElem}
                emailSuffix={emailSuffix}
                emailProvider={emailProvider}
                handleEmailSuffixInputChange={handleEmailSuffixInputChange}
                handleEmailSelectOnChange={handleEmailSelectOnChange}
                emailCheck={emailCheck}
            />
            <MemberProfileImage
                profileImg={joinData.profile}
                profileStatus={profileStatus}
                handleProfileDeleteOnClick={handleProfileDeleteOnClick}
                handleProfileOnChange={handleProfileOnChange}
            />
        </>
    )
}

export default MemberBasicInfo;