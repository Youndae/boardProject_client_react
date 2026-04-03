import React from 'react';

import MemberInfoOverlap from "./MemberInfoOverlap";

import {
    NICK_NAME_INFO_CHECK_MESSAGE
} from "../constants/userInfoCheckConstants";
import '../style/join.css';
import Button from "../../../common/components/Button";

function MemberNicknameForm(props) {
    const {
        nicknameValue,
        handleOnChange,
        nicknameElem,
        handleCheckNickname,
        nicknameCheck
    } = props;

    return (
        <div className="mb-2">
            <label className={'mr-5 mb-2'}><span className={'join_essential'}>*</span>닉네임</label>
            <input
                type={'text'}
                name={'nickname'}
                placeholder={'닉네임'}
                onChange={handleOnChange}
                ref={nicknameElem}
                value={nicknameValue}
            />
            <Button
                btnText={'중복체크'}
                onClick={handleCheckNickname}
            />
            <NicknameOverlap
                checkValue={nicknameCheck}
            />
        </div>
    )
}

function NicknameOverlap (props) {
    const { checkValue } = props;

    let overlapText = NICK_NAME_INFO_CHECK_MESSAGE(checkValue);

    return (
        <MemberInfoOverlap overlapText={overlapText} />
    )
}

export default MemberNicknameForm;