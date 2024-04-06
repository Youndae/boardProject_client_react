import React, { useState } from "react";
import Button from "./Button";
import {handleSearchBtnOnClick} from "../../modules/pagingModule";
import {useNavigate} from "react-router-dom";

function Search(props) {
    const { keyword, searchType } = props;
    const [values, setValues] = useState({
        keyword: keyword == null ? '' : keyword,
        searchType: searchType == null ? 't' : searchType,
    })
    const navigate = useNavigate();

    const searchOption = [];
    searchOption.push(
        <option value={'t'}>제목</option>
    );
    searchOption.push(
        <option value={'c'}>내용</option>
    );
    searchOption.push(
        <option value={'u'}>작성자</option>
    );
    searchOption.push(
        <option value={'tc'}>제목+내용</option>
    );

    switch (values.searchType) {
        case 't':
            searchOption[0] = <option value={'t'} selected={true}>제목</option>
            break;
        case 'c':
            searchOption[1] = <option value={'c'} selected={true}>내용</option>
            break;
        case 'u':
            searchOption[2] = <option value={'u'} selected={true}>작성자</option>
            break;
        case 'tc':
            searchOption[3] = <option value={'tc'} selected={true}>제목+내용</option>
            break;
        default:
            break;
    }

    const handleOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleBtnOnClick = () => {
        handleSearchBtnOnClick(navigate, values.keyword, values.searchType);
    }


    return (
        <div className="search">
            <select className="searchType" name={'searchType'} onChange={handleOnChange}>
                {searchOption}
            </select>
            <input type={'text'} value={values.keyword} name={'keyword'} onChange={handleOnChange}/>
            <Button
                btnText={'검색'}
                onClick={handleBtnOnClick}
            />
        </div>
    )
}

export default Search;