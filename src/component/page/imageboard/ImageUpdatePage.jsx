import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import BoardWriteForm from "../board/BoardWriteForm";
import Button from "../../ui/Button";
import ImageOldPreviewForm from "./ImageOldPreviewForm";
import ImageNewPreviewForm from "./ImageNewPreviewForm";

import {
    setZeroToPreviewNo,
    imageInputChange,
    deleteNewImagePreview,
    setFormData
} from "../../../modules/imageModule";
import {axiosErrorHandling, imageAxios, imageInsertAxios} from "../../../modules/customAxios";

function ImageUpdatePage () {
    const { imageNo } = useParams();
    const [values, setValues] = useState({
        title: '',
        content: '',
    });
    const [imageDataValue, setImageDataValue] = useState([]);
    const [deleteImageName, setDeleteImageName] = useState([]);
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getImageBoardData(imageNo);
        getImageData(imageNo);

        setZeroToPreviewNo();
    }, [imageNo]);

    //게시글 title, content 데이터 조회
    const getImageBoardData = async (imageNo) => {
        await imageAxios.get(`patch-detail/${imageNo}`)
            .then(res => {
                setValues({
                    title: res.data.content.imageTitle,
                    content: res.data.content.imageContent,
                });
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    //게시글 이미지 리스트 조회
    const getImageData = async (imageNo) => {
        await imageAxios.get(`patch-detail/image/${imageNo}`)
            .then(res => {
                setImageDataValue(res.data);
            })
            .catch(err => {
                axiosErrorHandling(err);
            });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        let formData = setFormData(values, files);
        deleteImageName.forEach(
            fileName => formData.append('deleteFiles', fileName)
        );

        await imageInsertAxios.patch(`${imageNo}`, formData)
                    .then(res => {
                        navigate(`/image/${res.data}`);
                    })
                    .catch(err => {
                        axiosErrorHandling(err);
                    })
    }


    //기존 이미지 삭제
    const handleOldImageDelete = (e) => {
        const deleteImageStep = Number(e.target.getAttribute('value'));
        const imageDataArr = [...imageDataValue];
        const deleteObject = imageDataArr.find(function(item) {
            console.log('fileNo type : ', typeof item.imageStep);
            console.log('deleteNo type : ', typeof deleteImageStep);
            return item.imageStep === deleteImageStep;
        });

        const deleteIndex = imageDataArr.indexOf(deleteObject);
        imageDataArr.splice(deleteIndex, 1);

        setImageDataValue(imageDataArr);

        const deleteFileName = deleteObject.imageName;
        setDeleteImageName([...deleteImageName, deleteFileName]);
    }

    //title, content 수정
    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name] : e.target.value,
        })
    }

    //이미지 추가
    const handleImageInputChange = (e) => {
        const inputResultArray = imageInputChange(e, files);

        if(inputResultArray !== null)
            setFiles(inputResultArray);
    }

    //새로운 이미지 삭제
    const handleImageDelete = (e) => {
        const deleteResultArray = deleteNewImagePreview(e, files);

        setFiles(deleteResultArray);
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
                            {imageDataValue.map((imageData, index) => {
                                return (
                                    <ImageOldPreviewForm
                                        key={imageData.imageStep}
                                        imageData={imageData}
                                        handleOnClick={handleOldImageDelete}
                                    />
                                )
                            })}
                            {files.map((files, index) => {
                                return (
                                    <ImageNewPreviewForm
                                        key={index}
                                        files={files}
                                        handleOnClick={handleImageDelete}
                                    />
                                )
                            })}
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