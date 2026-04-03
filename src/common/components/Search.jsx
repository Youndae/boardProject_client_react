import React, { useState } from "react";
import Button from "./Button";
import {useNavigate} from "react-router-dom";

import { handleSearchBtnOnClick } from '../utils/searchUtils';

function Search(props) {
    const { keyword, searchType } = props;
    const [values, setValues] = useState({
        keyword: keyword == null ? '' : keyword,
        searchType: searchType == null ? 't' : searchType,
    });
    const navigate = useNavigate();

    const searchOptionArr = [];
    searchOptionArr.push({
        value: 't',
        text: '제목',
    })
    searchOptionArr.push({
        value: 'c',
        text: '내용',
    })
    searchOptionArr.push({
        value: 'u',
        text: '작성자',
    })
    searchOptionArr.push({
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
        handleSearchBtnOnClick(navigate, values);
    }

    return (
        <div className="search">
            <select name="searchType" className="searchType" onChange={handleOnChange} value={values.searchType}>
                {searchOptionArr.map((option, index) => {
                    return (
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