import React from 'react';
import Button from "./Button";
import Overlap from "./Overlap";

function MemberNickname(props) {
    const { nickname, handleChange, nicknameElem, handleCheckNickname, nicknameCheck } = props;

    return(
        <div className="mb-2">
            <label className="mr-5 mb-2"><span className={'join_essential'}>*</span>닉네임</label>
            <input type={'text'} name={'nickname'} placeholder={'닉네임'} onChange={handleChange} ref={nicknameElem} value={nickname.nickname}/>
            <Button
                btnText={"중복체크"}
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

    let overlapText = '';

    if(checkValue === 'empty')
        overlapText = '닉네임을 입력하세요';
    else if(checkValue === 'duplication')
        overlapText = '이미 사용중인 닉네임입니다';
    else if(checkValue === 'valid')
        overlapText = '사용 가능한 닉네임입니다';
    else if(checkValue === 'err')
        overlapText = '오류가 발생했습니다. 문제가 계속되면 문의해주세요';
    else if(checkValue === 'notDuplicateCheck')
        overlapText = '닉네임 중복 체크를 해주세요';

    return (
        <Overlap
            overlapText={overlapText}
        />
    )
}

export default MemberNickname;