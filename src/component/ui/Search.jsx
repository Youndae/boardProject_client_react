import React, { useState } from "react";
import Button from "./Button";
import {useNavigate} from "react-router-dom";

import {handleSearchBtnOnClick} from "../../modules/pagingModule";

function Search(props) {
    const { keyword, searchType } = props;
    const [values, setValues] = useState({
        keyword: keyword == null ? '' : keyword,
        searchType: searchType == null ? 't' : searchType,
    })
    const navigate = useNavigate();

    const searchOptionArray = [];
    searchOptionArray.push({
        value: 't',
        text: '제목',
    })
    searchOptionArray.push({
        value: 'c',
        text: '내용',
    })
    searchOptionArray.push({
        value: 'u',
        text: '작성자',
    })
    searchOptionArray.push({
        value: 'tc',
        text: '제목+내용',
    })

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
            <select className="searchType" name={'searchType'} onChange={handleOnChange} value={values.searchType}>
                {searchOptionArray.map((option, index) => {
                    return(
                        <SearchOption
                            key={index}
                            option={option}
                        />
                    )
                })}
            </select>
            <input type={'text'} value={values.keyword} name={'keyword'} onChange={handleOnChange}/>
            <Button
                btnText={'검색'}
                onClick={handleBtnOnClick}
            />
        </div>
    )
}

function SearchOption(props) {
    const { option } = props;

    return (
        <option value={option.value}>{option.text}</option>
    )
}

export default Search;