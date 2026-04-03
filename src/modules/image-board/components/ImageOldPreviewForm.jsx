import React from "react";
import styled from 'styled-components';

import ImageDisplay from "../components/ImageDisplay";

import {IMAGE_SIZE} from "../constants/imageSizeConstants";

const DeleteBtnWrapper = styled.button`
    background: none;
    border: none;
    margin-bottom: 10px;
`

function ImageOldPreviewForm(props) {
    const { imageData, handleOnClick } = props;

    return (
        <div className="preview-box">
            <ImageDisplay
                imageClassName={'thumbnail'}
                imageName={imageData.imageName}
                type={'board'}
                size={IMAGE_SIZE.MEDIUM}
            />
            <p>{imageData.originName}</p>
            <DeleteBtnWrapper onClick={handleOnClick} value={imageData.imageStep}>삭제</DeleteBtnWrapper>
        </div>
    )
}

export default ImageOldPreviewForm;