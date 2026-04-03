import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import BoardWriteForm from '../../../common/components/BoardWriteForm';
import Button from '../../../common/components/Button';
import ImageNewPreviewForm from '../components/ImageNewPreviewForm';

import { handleLocationPathToLogin } from '../../../common/utils/locationPathUtils';
import {
    setZeroToPreviewNo,
    setFormData,
    parsingImageInput,
    deleteNewImagePreview
} from '../../../common/utils/imageUtils';
import { postImageBoard } from '../services/imageBoardService';
import styled from "styled-components";


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

function ImageBoardWritePage() {
    const [values, setValues] = useState({
        title: '',
        content: '',
    });
    const [files, setFiles] = useState([]);
    const isLoggedIn = useSelector(state => state.member.loginStatus);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if(!isLoggedIn)
            handleLocationPathToLogin(pathname, navigate);

        setZeroToPreviewNo();
    }, [isLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = values.title;
        const content = values.content;

        if(title === '' || !title)
            alert('제목을 입력하세요');
        else if(content === '' || !content)
            alert('내용을 입력하세요');
        else if(files.length === 0)
            alert('이미지 파일은 최소 1장 이상 업로드해야 합니다.');
        else {
            try {
                const formData = setFormData(values, files);
                const res = await postImageBoard(formData);
                const postId = res.data.content;

                navigate(`/image/${postId}`);
            }catch(err) {
                console.error('Failed post image board: ', err);
            }
        }
    }

    const handleInputOnChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const handleImageInputOnChange = (e) => {
        const inputImageArray = parsingImageInput(e, files);

        if(inputImageArray !== null)
            setFiles(inputImageArray);
    }

    const handleDeletePreview = (e) => {
        const imageArray = deleteNewImagePreview(e, files);

        setFiles(imageArray);
    }

    if(isLoggedIn) {
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
                                {files.map((files, index) => {
                                    return (
                                        <ImageNewPreviewForm
                                            key={index}
                                            files={files}
                                            handleOnClick={handleDeletePreview}
                                        />
                                    )
                                })}
                            </div>
                            <div className="footer">
                                <Button
                                    btnText={'등록'}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ImageBoardWritePage;