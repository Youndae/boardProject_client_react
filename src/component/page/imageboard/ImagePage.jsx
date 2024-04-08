import React, { useEffect, useState } from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";

import ImageBoardList from "../../list/ImageBoardList";
import SearchPaging from "../pagination/SearchPaging";

import { createPagingObject } from "../../../modules/pagingModule";
import {axiosErrorHandling, imageAxios} from "../../../modules/customAxios";

function ImagePage() {
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
        getImageList(pageNum, keyword, searchType);
    }, [pageNum, keyword, searchType]);

    const getImageList = async (pageNum, keyword, searchType) => {
        await imageAxios.get(`?keyword=${keyword}&searchType=${searchType}&pageNum=${pageNum}`)
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
                axiosErrorHandling(err, navigate);
            });

    }

    return (
        <div className={'container'}>
            <ImageBoardList
                image={data}
                onClickItem={(item) => {
                    navigate(`/image/${item.imageNo}`)
                }}
                onClickBtn={() => {
                    navigate('/image/insert')
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

export default ImagePage;