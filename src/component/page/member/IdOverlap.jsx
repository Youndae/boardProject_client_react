import React from 'react';
import styled from "styled-components";

const OverlapDiv = styled.div`
    color: red;
`

function EmptyId (props){
    return (
        <OverlapDiv>
            아이디를 입력하세요
        </OverlapDiv>
    )
}

function InvalidId(props) {
    return (
        <OverlapDiv>
            영문자와 숫자를 사용한 5 ~ 15자리만 가능합니다
        </OverlapDiv>
    )
}

function DuplicationId(props) {
    return (
        <OverlapDiv>
            이미 사용중인 아이디입니다
        </OverlapDiv>
    )
}

function ValidId(props) {
    return (
        <OverlapDiv>
            사용 가능한 아이디입니다
        </OverlapDiv>
    )
}

function ErrorId(props) {
    return (
        <OverlapDiv>
            오류가 발생했습니다. 문제가 계속되면 문의해주세요
        </OverlapDiv>
    )
}

function NotDuplicateCheckId(props) {
    return (
        <OverlapDiv>
            아이디 중복 체크를 해주세요
        </OverlapDiv>
    )
}

function defaultOverlap(props) {
    return (
        <OverlapDiv>

        </OverlapDiv>
    )
}


function IdOverlap(props) {
    const { checkValue } = props;

    if(checkValue === 'empty'){
        return (
            <EmptyId/>
        )
    }else if(checkValue === 'invalid'){
        return (
            <InvalidId/>
        )
    }else if(checkValue === 'duplication'){
        return (
            <DuplicationId/>
        )
    }else if(checkValue === 'valid'){
        return (
            <ValidId/>
        )
    }else if(checkValue === 'err'){
        return (
            <ErrorId/>
        )
    }else if(checkValue === 'notDuplicateCheck'){
        return (
            <NotDuplicateCheckId/>
        )
    }
}

export default IdOverlap;