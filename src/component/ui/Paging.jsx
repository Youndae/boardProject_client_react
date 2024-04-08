import React from "react";
import styled from "styled-components";

import PagingButton from "./PagingButton";

const PagingliWrapper = styled.li`
    list-style: none;
    float: left;
    padding: 5px;
`

function Paging(props) {
    const { pagingData, pageNumOnClick, prevOnClick, nextOnClick } = props;

    let prevElem = null;
    let nextElem = null;
    const pagingNumberArr = [];

    if(pagingData.endPage !== 1){
        for(let i = pagingData.startPage; i <= pagingData.endPage; i++){
            let pagingClassName = 'pagingNumber';

            if(i === Number(pagingData.activeNo))
                pagingClassName = pagingClassName + ' active';

            const body = {
                pageNum: i,
                className: pagingClassName,
            }

            pagingNumberArr.push(body);
        }
    }

    if(pagingData.prev)
        prevElem = <PagingliWrapper>
                        <PagingButton
                            btnText={'prev'}
                            className={'pagingPrev'}
                            onClick={prevOnClick}
                        />
                    </PagingliWrapper>;

    if(pagingData.next)
        nextElem = <PagingliWrapper>
                        <PagingButton
                            btnText={'next'}
                            className={'pagingNext'}
                            onClick={nextOnClick}
                        />
                    </PagingliWrapper>;


    return(
        <div className="paging">
            <ul>
                {prevElem}
                {pagingNumberArr.map((pagingNum, index) => {
                    return(
                        <PagingNumber
                            key={index}
                            pagingNumberData={pagingNum}
                            btnOnClick={pageNumOnClick}
                        />
                    )
                })}
                {nextElem}
            </ul>
        </div>
    )
}

function PagingNumber(props) {
    const { pagingNumberData, btnOnClick } = props;

    return (
        <PagingliWrapper>
            <PagingButton
                btnText={pagingNumberData.pageNum}
                className={pagingNumberData.className}
                onClick={btnOnClick}
            />
        </PagingliWrapper>
    )
}

export default Paging;