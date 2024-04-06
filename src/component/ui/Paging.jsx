import React from "react";
import styled from "styled-components";

import PagingButton from "./PagingButton";

const PagingliWrapper = styled.li`
    list-style: none;
    float: left;
    padding: 5px;
`

function Paging(props) {
    // prev, next 값(boolean)
    // startPage, endPage = 버튼 출력할 시작, 끝 범위
    // activeNo = 현재 보고 있는 페이지 번호
    // noOnClick = 페이지 번호 클릭 이벤트
    // prevOnClick, nextOnClick = Prev, next 클릭 이벤트
    const { pagingData, pageNumOnClick, prevOnClick, nextOnClick } = props;

    let prevElem = null;
    let nextElem = null;
    const pagingNumberArr = [];
    const defaultPagingClassName = 'pagingNumber';
    const activePagingClassName = defaultPagingClassName + ' active';

    if(pagingData.endPage !== 1){
        for(let i = pagingData.startPage; i <= pagingData.endPage; i++){
            let pagingNoElem = <PagingliWrapper>
                <PagingButton
                    btnText={i}
                    className={defaultPagingClassName}
                    onClick={pageNumOnClick}
                />
            </PagingliWrapper>;

            if(i === Number(pagingData.activeNo))
                pagingNoElem = <PagingliWrapper>
                    <PagingButton
                        btnText={i}
                        className={activePagingClassName}
                        onClick={pageNumOnClick}
                    />
                </PagingliWrapper>;

            pagingNumberArr.push(pagingNoElem);
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
                {pagingNumberArr}
                {nextElem}
            </ul>
        </div>
    )

}

export default Paging;