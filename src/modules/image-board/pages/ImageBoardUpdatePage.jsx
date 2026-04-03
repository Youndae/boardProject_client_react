import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from 'styled-components';

import BoardWriteForm from '../../../common/components/BoardWriteForm';
import Button from '../../../common/components/Button';
import ImageNewPreviewForm from '../components/ImageNewPreviewForm';
import ImageOldPreviewForm from '../components/ImageOldPreviewForm';

import {
    setZeroToPreviewNo,
    setFormData,
    parsingImageInput, deleteNewImagePreview
} from '../../../common/utils/imageUtils';
import {
    getPatchDetail,
    patchImageBoard
} from '../services/imageBoardService';


const AttachDivWrapper = styled.div`
    margin-bottom: 15px;
`

const HiddenFileInput = styled.input`
  display: none;
`;

const CustomFileButton = styled.label`
    display: inline-block;
    padding: 5px 10px;
    background-color: deepskyblue;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.2s;
    
  &:hover {
    background-color: #0056b3;
  }
`;

function ImageBoardUpdatePage() {
    const { id } = useParams();
    const [values, setValues] = useState({
        title: '',
        content: '',
    });
    const [imageData, setImageData] = useState([]);
    const [deleteImage, setDeleteImage] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getDetail = async (imageId) => {
            try {
                const res = await getPatchDetail(imageId);

                setValues({
                    title: res.data.content.title,
                    content: res.data.content.content,
                });
                setImageData(res.data.content.imageList);
            }catch(err) {
                console.error('Failed get patch image board data: ', err);
            }
        }

        getDetail(id);
        setZeroToPreviewNo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = values.title;
        const content = values.content;

        if(title === '' || !title)
            alert('제목을 입력해주세요');
        else if(content === '' || !content)
            alert('내용을 입력해주세요');
        else if(imageData.length === deleteImage.length && newFiles.length === 0)
            alert('이미지 파일은 최소 1장 이상이어야 합니다.')
        else {
            try {
                let formData = setFormData(values, newFiles);
                deleteImage.forEach(fileName => formData.append('deleteFiles', fileName));
                const res = await patchImageBoard(id, formData);
                const patchId = res.data.content;

                navigate(`/image/${patchId}`);
            }catch(err) {
                console.error('Failed patch image board: ', err);
            }
        }
    }

    const handleOldImageDelete = (e) => {
        const deleteImageStep = Number(e.currentTarget.value);
        const newArr = [...imageData];
        const deleteObject = newArr.find(function(item) {
            return item.imageStep === deleteImageStep;
        });
        const deleteIdx = newArr.indexOf(deleteObject);
        newArr.splice(deleteIdx, 1);

        setImageData(newArr);

        const deleteFileName = deleteObject.imageName;
        setDeleteImage([...deleteImage, deleteFileName]);
    }

    const handleInputOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageInputOnChange = (e) => {
        const inputImageArray = parsingImageInput(e, newFiles);

        if(inputImageArray !== null)
            setNewFiles(inputImageArray);
    }

    const handleNewImageDeletePreview = (e) => {
        const imageArray = deleteNewImagePreview(e, newFiles);

        setNewFiles(imageArray);
    }

    return (
        <div className="container">
            <div className="wrapper">
                <div className="header">
                    <h1>사진첨부</h1>
                </div>
                <div className="body">
                    <form onSubmit={handleSubmit}>
                        <BoardWriteForm
                            values={values}
                            handleChange={handleInputOnChange}
                        />
                        <AttachDivWrapper className="attach">
                            <CustomFileButton htmlFor={'file-upload'}>파일 선택</CustomFileButton>
                            <HiddenFileInput
                                id={'file-upload'}
                                type={'file'}
                                onChange={handleImageInputOnChange}
                                multiple
                            />
                        </AttachDivWrapper>
                        <div className="content" id="preview">
                            {imageData.map((imageData, index) => {
                                return (
                                    <ImageOldPreviewForm
                                        key={imageData.imageStep}
                                        imageData={imageData}
                                        handleOnClick={handleOldImageDelete}
                                    />
                                )
                            })}
                            {newFiles.map((files, index) => {
                                return (
                                    <ImageNewPreviewForm
                                        key={index}
                                        files={files}
                                        handleOnClick={handleNewImageDeletePreview}
                                    />
                                )
                            })}
                        </div>
                        <div className="footer">
                            <Button btnText={'등록'}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ImageBoardUpdatePage;