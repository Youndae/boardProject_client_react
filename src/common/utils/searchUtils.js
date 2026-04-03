import {buildQueryString} from "./queryStringUtils";

export const handleSearchBtnOnClick = (navigate, values) => {
    const queryString = buildQueryString({
        keyword: values.keyword,
        searchType: values.searchType
    })

    navigate(`${queryString}`);
}