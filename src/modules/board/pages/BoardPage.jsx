import React, { useState, useEffect } from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

import { getList } from '../services/boardService';
import { createPagingObject } from '../../../common/utils/paginationUtils';
import { handlePageChange } from "../../../common/utils/paginationUtils";

import BoardList from '../components/BoardList'
import SearchPaging from '../../../common/components/SearchPaging';

function BoardPage() {
    const [params] = useSearchParams();
    const pageNum = params.get('page') == null ? 1 : params.get('page');
    const keyword = params.get('keyword');
    const searchType = params.get('searchType');
    const [listData, setListData] = useState([]);
    const [pagingData, setPagingData] = useState({
        startPage: 0,
        endPage: 0,
        prev: false,
        next: false,
        activeNo: pageNum,
    })
    const navigate = useNavigate();

    useEffect(() => {
        let isCancelled = false;

        const getBoardList = async (pageNum, keyword, searchType) => {
            try {
                const res = await getList(pageNum, keyword, searchType);
                if(isCancelled) return;

                const pagingObject = createPagingObject(pageNum, res.data.content.totalPages);

                setListData(res.data.content.items);
                setPagingData({
                    startPage: pagingObject.startPage,
                    endPage: pagingObject.endPage,
                    prev: pagingObject.prev,
                    next: pagingObject.next,
                    activeNo: pageNum,
                });
            }catch (err) {
                console.error('Failed to get Board list', err);
            }
        }

        getBoardList(pageNum, keyword, searchType);

        return () => { isCancelled = true; }
    }, [pageNum, keyword, searchType]);

    const handlePageBtn = (type) => {
        handlePageChange({
            typeOrNumber: type,
            pagingData,
            navigate,
            keyword: keyword,
            searchType: searchType
        })
    }

    return(
        <div className="container">
            <BoardList
                data={listData}
                onClickBtn={() => {
                    navigate('/board/insert')
                }}
            />
            <SearchPaging
                pagingData={pagingData}
                keyword={keyword}
                searchType={searchType}
                handlePageBtn={handlePageBtn}
            />
        </div>
    )
}

export default BoardPage;