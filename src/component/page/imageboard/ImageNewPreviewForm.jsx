import React, {useEffect, useState} from "react";
import {customImageAxios} from "../../../modules/customAxios";
import styled from "styled-components";

const ImgWrapper = styled.img`
    width: 300px;
    height: 300px;
`
function ImageNewPreviewForm(props) {
    const { handleOnClick, files } = props;
    // const [fileName, setFileName] = useState('');
    const [imgSrc, setImgSrc] = useState('');

    // console.log('new preview imageData : ', imageData);
    console.log('new preview files : ', files);

    useEffect(() => {
        // setFileName(files.file.name);
        const reader = new FileReader();
        reader.onload = image => {
            setImgSrc(String(image.target.result));
        }
        reader.readAsDataURL(files.file);
    })


    return (
        <div className="preview-box">
            <ImgWrapper src={imgSrc} alt={""} className={"thumbnail"}/>
            <p>{files.file.name}</p>
            <a href={'#'} onClick={handleOnClick} value={files.fileNo}>삭제</a>
        </div>
    )
}

export default ImageNewPreviewForm;