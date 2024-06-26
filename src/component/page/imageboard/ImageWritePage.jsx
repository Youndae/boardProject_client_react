import React, { useEffect, useState } from 'react';
import {useNavigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";

import BoardWriteForm from "../board/BoardWriteForm";
import Button from "../../ui/Button"
import ImageNewPreviewForm from "./ImageNewPreviewForm";

import {
    setZeroToPreviewNo,
    imageInputChange,
    deleteNewImagePreview,
    setFormData
} from "../../../modules/imageModule";
import {axiosErrorHandling, imageInsertAxios} from "../../../modules/customAxios";
import {handleLocationPathToLogin} from "../../../modules/loginModule";

function ImageWritePage() {
    const [values, setValues] = useState({
       title: "",
       content: "",
    });
    const [files, setFiles] = useState([]);
    const [userStatus, setUserStatus] = useState(null);
    const loginStatus = useSelector(state => state.user);
    const navigate = useNavigate();

    const { pathname } = useLocation();

    useEffect(() => {
        if(loginStatus === 'loggedIn') {
            setUserStatus(true);
        }else if(loginStatus === 'loggedOut')
            handleLocationPathToLogin(pathname, navigate);

        setZeroToPreviewNo();
    }, [loginStatus]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = setFormData(values, files);

        await imageInsertAxios.post('', formData)
                .then(res => {
                    console.log('image insert res.data : ', res.data);
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
        const inputResultArray = imageInputChange(e, files);

        if(inputResultArray !== null)
            setFiles(inputResultArray);
    }

    //미리보기 삭제
    const deletePreview = (e) => {
        const deleteResultArray = deleteNewImagePreview(e, files);

        setFiles(deleteResultArray);

    }

    if(userStatus) {
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
}

export default ImageWritePage;