import React from 'react';

import MemberInfoOverlap from "./MemberInfoOverlap";

import {
    EMAIL_INFO_CHECK_MESSAGE
} from "../constants/userInfoCheckConstants";
import '../style/join.css';

function MemberEmailForm (props) {
    const {
        emailValue,
        handleOnChange,
        emailElem,
        emailSuffix,
        emailProvider,
        handleEmailSuffixInputChange,
        handleEmailSelectOnChange,
        emailCheck
    } = props;

    return (
        <div className="mb-2">
            <label className="mr-5 mb-2"><span className={'join_essential'}>*</span>이메일</label>
            <input type={'text'} name={'email'} placeholder={'이메일'} onChange={handleOnChange} ref={emailElem} value={emailValue}/>
            <span>@</span>
            <EmailProvider
                emailSuffix={emailSuffix}
                providerStatus={emailProvider}
                handleInputChange={handleEmailSuffixInputChange}
            />
            <select className={'email-select'} name={'email-suffix'} onChange={handleEmailSelectOnChange} defaultValue={'naver'} value={emailProvider}>
                <option value={'naver'}>네이버</option>
                <option value={'daum'}>다음</option>
                <option value={'gmail'}>구글</option>
                <option value={'none'}>직접입력</option>
            </select>
            <EmailOverlap
                checkValue={emailCheck}
            />
        </div>
    )
}

function EmailProvider (props) {
    const { emailSuffix, providerStatus, handleInputChange } = props;

    if(providerStatus === 'none'){
        return (
            <input
                type={'text'}
                name={'email-suffix-input'}
                onChange={handleInputChange}
                value={emailSuffix}
            />
        )
    }else{
        return null;
    }
}

function EmailOverlap (props) {
    const { checkValue } = props;

    let overlapText = EMAIL_INFO_CHECK_MESSAGE(checkValue);

    return (
        <MemberInfoOverlap
            overlapText={overlapText}
        />
    )
}

export default MemberEmailForm;