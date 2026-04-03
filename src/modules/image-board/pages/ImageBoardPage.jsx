import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";

import ImageBoardList from '../components/ImageBoardList';
import SearchPaging from '../../../common/components/SearchPaging';

import { getList } from '../services/imageBoardService'
import {createPagingObject, handlePageChange} from "../../../common/utils/paginationUtils";

function ImageBoardPage() {
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

        const getImageList = async (pageNum, keyword, searchType) => {
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
                console.error('Failed to get ImageBoard list', err);
            }
        }

        getImageList(pageNum, keyword, searchType);

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

    return (
        <div className="container">
            <ImageBoardList
                image={listData}
                onClickBtn={() => {
                    navigate('/image/insert')
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

export default ImageBoardPage;