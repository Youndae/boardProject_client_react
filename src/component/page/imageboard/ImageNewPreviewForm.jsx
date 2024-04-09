import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

const ImgWrapper = styled.img`
    width: 300px;
    height: 300px;
`
function ImageNewPreviewForm(props) {
    const { handleOnClick, files } = props;
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
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
            <Link onClick={handleOnClick} value={files.fileNo}>삭제</Link>
        </div>
    )
}

export default ImageNewPreviewForm;