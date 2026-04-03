import {buildQueryString} from "./queryStringUtils";

export const createPagingObject = (pageNum, totalPages) => {
    let endPage = Number(Math.ceil(pageNum / 10.0) * 10);
    const startPage = endPage - 9;
    if(totalPages < endPage)
        endPage = totalPages;

    const prev = startPage > 1;
    const next = endPage < totalPages;

    return {
        startPage: startPage,
        endPage: endPage,
        prev: prev,
        next: next,
    }
}

export const handlePageChange = (
    typeOrNumber,
    pagingData,
    navigate,
    keyword,
    searchType
) => {
    const targetPage = getClickPageNumber(typeOrNumber, pagingData);
    if(!targetPage)
        return;

    const searchTypeValue = validateSearchType({keyword, searchType});

    const queryString = buildQueryString({
        page: targetPage,
        keyword,
        searchType: searchTypeValue
    });
    navigate(`${queryString}`);
}

const validateSearchType = ({keyword, searchType}) => keyword ? searchType : undefined;

export const getClickPageNumber = (typeOrNumber, pagingData) => {
    let targetPage;

    if(typeOrNumber === 'prev')
        targetPage = getPrevNumber(pagingData);
    else if(typeOrNumber === 'next')
        targetPage = getNextNumber(pagingData);
    else if(typeof typeOrNumber === 'string')
        targetPage = Number(typeOrNumber);
    else
        return;

    return targetPage;
}

const getPrevNumber = (pagingData) => pagingData.startPage - 1;
const getNextNumber = (pagingData) => pagingData.endPage + 1;