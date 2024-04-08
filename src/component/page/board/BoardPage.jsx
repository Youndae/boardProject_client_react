import React, { useState, useEffect } from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

import TextBoardList from '../../list/TextBoardList';
import SearchPaging from "../pagination/SearchPaging";

import {createPagingObject} from "../../../modules/pagingModule";
import {axiosErrorHandling, boardAxios} from "../../../modules/customAxios";

function BoardPage() {
    const [params] = useSearchParams();
    const pageNum = params.get('pageNum') == null ? 1 : params.get('pageNum');
    const keyword = params.get('keyword');
    const searchType = params.get('searchType');
    const [data, setData] = useState([]);
    const [pagingData, setPagingData] = useState({
        startPage: 0,
        endPage: 0,
        prev: false,
        next: false,
        activeNo: pageNum,
    });
    const navigate = useNavigate();

    useEffect(() => {
        getBoardList(pageNum, keyword, searchType);
    }, [pageNum, keyword, searchType]);

    const getBoardList = async (pageNum, keyword, searchType) => {

        await boardAxios.get(`?keyword=${keyword}&searchType=${searchType}&pageNum=${pageNum}`)
            .then(res => {
                const pagingObject = createPagingObject(pageNum, res.data.totalPages);

                setData(res.data.content);
                setPagingData({
                    startPage: pagingObject.startPage,
                    endPage: pagingObject.endPage,
                    prev: pagingObject.prev,
                    next: pagingObject.next,
                    activeNo: pageNum,
                });
            })
            .catch(err => {
                axiosErrorHandling(err);
            });

    }

    return (
        <div className="container">
            <TextBoardList
                data={data}
                onClickItem={(item) => {
                    navigate(`/board/${item.boardNo}`)
                }}
                onClickBtn={() => {
                    navigate('/board/insert')
                }}
            />
            <SearchPaging
                pagingData={pagingData}
                keyword={keyword}
                searchType={searchType}
            />
        </div>
    );
}

export default BoardPage;