import React from 'react';

import Pagination from './Pagination';
import Search from './Search';

function SearchPaging(props) {
    const { pagingData, keyword, searchType, handlePageBtn } = props;

    return(
        <>
            <Search
                keyword={keyword}
                searchType={searchType}
            />
            <Pagination
                pagingData={pagingData}
                handlePageBtn={handlePageBtn}
            />
        </>
    )
}

export default SearchPaging;