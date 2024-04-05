import React, { useEffect, useState, useRef } from 'react';
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import { imageValidation } from "../../../modules/imageModule";


import BoardWriteForm from "../board/BoardWriteForm";
import Button from "../../ui/Button"
import {customImageInsertAxios} from "../../../modules/customAxios";
import ImageNewPreviewForm from "./ImageNewPreviewForm";




let previewNo = 0;
function ImageWritePage() {
    const [values, setValues] = useState({
       title: "",
       content: "",
    });
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state);
    const previewElem = useRef(null);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if(!isLoggedIn)
            navigate(`/login`);

        previewNo = 0;
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData();

        formData.append('imageTitle', values.title);
        formData.append('imageContent', values.content);
        files.forEach(file => formData.append('files', file.file));

        customImageInsertAxios.post('', formData)
            .then(res => {
                console.log('image insert res : ', res.data);
                navigate(`/image/${res.data}`);
            })
            .catch(err => {
                console.log('image insert error : ', err);
            })
    }

    //title, content input 입력
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value,
        })
    };

    //이미지 추가
    const handleImageInputChange = (e) => {
        const validationResult = imageValidation(e);

        if(validationResult){
            const fileList = e.target.files;
            let fileArr = [...files];

            for(let i = 0; i < fileList.length; i++){
                fileArr.push({
                    fileNo: ++previewNo,
                    file: fileList[i],
                });
            }

            setFiles(fileArr);
        }
    }

    //미리보기 삭제
    const deletePreview = (e) => {
        const deleteNo = e.target.getAttribute('value');
        let arr = [...files];
        const delObject = arr.find(function(item) {
            return item.fileNo === deleteNo;
        })

        const delIndex = arr.indexOf(delObject);
        arr.splice(delIndex, 1);

        setFiles(arr);
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
                            <input type={"file"} onChange={handleImageInputChange} multiple/>
                        </div>
                        <div className="content" id="preview" ref={previewElem}>
                            {files.map((files, index) => {
                                return (
                                    <ImageNewPreviewForm
                                        key={index}
                                        files={files}
                                        handleOnClick={deletePreview}
                                    />
                                )
                            })}
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