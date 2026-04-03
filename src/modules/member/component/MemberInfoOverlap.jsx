import React from 'react';
import styled from "styled-components";


const OverlapDiv = styled.div`
    color: red;
`

function MemberInfoOverlap(props) {
    const { overlapText } = props;

    return (
        <OverlapDiv>
            {overlapText}
        </OverlapDiv>
    )
}

export default MemberInfoOverlap;