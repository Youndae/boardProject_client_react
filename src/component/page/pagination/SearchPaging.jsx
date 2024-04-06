import React from "react";
import { useNavigate } from "react-router-dom";

import Paging from "../../ui/Paging";
import Search from "../../ui/Search";

import { handlePageNumBtn, handlePrevBtn, handleNextBtn } from "../../../modules/pagingModule";

function SearchPaging(props) {
    const { pagingData, keyword, searchType} = props;
    const navigate = useNavigate();

    const handlePageNoBtnOnClick = (e) => {
        handlePageNumBtn(e, navigate, keyword, searchType);
    }

    const handlePagePrevBtnOnClick = () => {
        handlePrevBtn(pagingData.startPage, navigate, keyword, searchType);
    }

    const handlePageNextBtnOnClick = () => {
        handleNextBtn(pagingData.endPage, navigate, keyword, searchType);
    }

    return(
        <>
            <Search
                keyword={keyword}
                searchType={searchType}
                // searchBtnOnClick={searchBtnOnClick}
            />
            <Paging
                pagingData={pagingData}
                pageNumOnClick={handlePageNoBtnOnClick}
                prevOnClick={handlePagePrevBtnOnClick}
                nextOnClick={handlePageNextBtnOnClick}
            />
        </>
    )
}

export default SearchPaging;