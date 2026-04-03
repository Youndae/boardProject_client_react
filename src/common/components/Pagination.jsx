import React from 'react';
import styled from 'styled-components';

import PagingButton from './PagingButton';

const PagingLiWrapper = styled.li`
    list-style: none;
    float: left;
    padding: 5px;
`

function Pagination(props) {
    const {
        pagingData,
        handlePageBtn
    } = props;

    let prevElem = null;
    let nextElem = null;
    const pagingNumArr = [];

    if(pagingData.endPage !== 1) {
        for(let i = pagingData.startPage; i <= pagingData.endPage; i++) {
            let pagingClassName = 'pagingNumber';

            if(i === Number(pagingData.activeNo))
                pagingClassName = `${pagingClassName} active`;

            const body = {
                pageNum: i,
                className: pagingClassName,
            }

            pagingNumArr.push(body)
        }
    }

    if(pagingData.prev)
        prevElem = <PagingLiWrapper>
                        <PagingButton
                            btnText={'prev'}
                            className={'pagingPrev'}
                            onClick={() => handlePageBtn('prev')}
                        />
                    </PagingLiWrapper>

    if(pagingData.next)
        nextElem = <PagingLiWrapper>
                        <PagingButton
                            btnText={'next'}
                            className={'pagingNext'}
                            onClick={() => handlePageBtn('next')}
                        />
                    </PagingLiWrapper>


    return (
        <div className="paging">
            <ul>
                {prevElem}
                {pagingNumArr.map((pagingData, index) => {
                    return (
                        <PagingNumber
                            key={index}
                            pagingNumberData={pagingData}
                            btnOnClick={() => handlePageBtn(String(pagingData.pageNum))}
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
        <PagingLiWrapper>
            <PagingButton
                btnText={pagingNumberData.pageNum}
                className={pagingNumberData.className}
                onClick={btnOnClick}
            />
        </PagingLiWrapper>
    )
}

export default Pagination;