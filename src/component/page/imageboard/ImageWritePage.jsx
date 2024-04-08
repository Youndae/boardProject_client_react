import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import BoardWriteForm from "../board/BoardWriteForm";
import Button from "../../ui/Button"
import ImageNewPreviewForm from "./ImageNewPreviewForm";

import { imageValidation } from "../../../modules/imageModule";
import {axiosErrorHandling, imageInsertAxios, memberAxios} from "../../../modules/customAxios";




let previewNo = 0;
function ImageWritePage() {
    const [values, setValues] = useState({
       title: "",
       content: "",
    });
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    useEffect(() => {
        checkUserStatus();

        previewNo = 0;
    }, []);

    const checkUserStatus = async () => {
        await memberAxios.get(`check-login`)
            .then(res => {
                const status = res.data.loginStatus;
                if(status === false){
                    const body = {
                        type: 'isLoggedOut',
                    }
                    dispatch(body);
                    window.location.href = '/login';
                }
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    function handleSubmit(e) {
        e.preventDefault();

        let formData = new FormData();

        formData.append('imageTitle', values.title);
        formData.append('imageContent', values.content);
        files.forEach(file => formData.append('files', file.file));

        imageInsertAxios.post('', formData)
            .then(res => {
                navigate(`/image/${res.data}`);
            })
            .catch(err => {
                axiosErrorHandling(err);
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
                        <div className="content" id="preview">
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