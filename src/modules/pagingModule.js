
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

export function handlePageNumBtn (e, navigate, keyword, searchType) {
    const clickNo = e.target.textContent;

    paginationNavigate(clickNo, keyword, searchType, navigate);
}

export function handlePrevBtn (startPage, navigate, keyword, searchType) {
    const prevNumber = startPage - 1;

    paginationNavigate(prevNumber, keyword, searchType, navigate);
}

export function handleNextBtn (endPage, navigate, keyword, searchType) {
    const nextNumber = endPage + 1;

    paginationNavigate(nextNumber, keyword, searchType, navigate);
}

export function handleSearchBtnOnClick (navigate, keyword, searchType) {
    searchNavigate(navigate, keyword, searchType);
}

const searchNavigate = (navigate, keyword, searchType) => {

    navigate(`?keyword=${keyword}&searchType=${searchType}`);
}

const paginationNavigate = (clickNo, keyword, searchType, navigate) => {

    if(keyword == null){
        navigate(`?pageNum=${clickNo}`);
    }else {
        navigate(`?keyword=${keyword}&searchType=${searchType}&pageNum=${clickNo}`);
    }
}