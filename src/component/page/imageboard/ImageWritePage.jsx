import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import BoardWriteForm from "../board/BoardWriteForm";
import Button from "../../ui/Button"

function ImageWritePage(props) {
    const [values, setValues] = useState({
       title: "",
       content: "",
    });
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state);

    useEffect(() => {
        if(!isLoggedIn)
            navigate(`/login`);
    })

    function handleSubmit(e) {
        e.preventDefault();

        console.log('image insert');
        console.log('title : ', values.title);
        console.log('content : ', values.content);
    }

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value,
        })
    };

    return (
        <div className="container">
            <div className="wrapper">
                <div className="header">
                    <h1>사진첨부</h1>
                </div>
                <div className="body">
                    <form onSubmit={handleSubmit}>
                        <BoardWriteForm values={values} handleChange={handleChange}/>
                        <div className="attach">
                            <input type={"file"} multiple />
                        </div>
                        <div className="content" id="preview">

                        </div>
                        <div className="footer">
                            <Button
                                btnText={"등록"}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ImageWritePage;