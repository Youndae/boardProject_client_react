import React, { useState } from 'react';
import { useParams } from "react-router-dom";

import BoardWriteForm from "../board/BoardWriteForm";
import Button from "../../ui/Button";

function ImageUpdatePage (props) {
    const { imageNo } = useParams();
    const [values, setValues] = useState({
        title: "",
        content: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('handleSubmit');
    }

    const handleChange = (e) => {

    }

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
                            <input type={"file"} multiple/>
                        </div>
                        <div className="content" id="preview">

                        </div>
                        <div className="footer">
                            <Button btnText={"등록"}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ImageUpdatePage;