import React, {useEffect, useState} from "react";
import {customImageAxios} from "../../../modules/customAxios";
import styled from "styled-components";

const ImgWrapper = styled.img`
    width: 300px;
    height: 300px;
`
function ImageOldPreviewForm(props) {
    const { imageData, handleOnClick } = props;
    const [imgSrc, setImgSrc] = useState(null);

    console.log('imageData : ', imageData);

    useEffect(() => {
        displayImage(imageData.imageName);
    }, [imageData]);

    const displayImage = async (imageName) => {
        await customImageAxios.get(`display/${imageName}`)
            .then(res => {
                const myFile = new File([res.data], 'imageName')
                const reader = new FileReader()
                reader.onload = ev => {
                    const previewImage = String(ev.target?.result)
                    setImgSrc(previewImage)
                }
                reader.readAsDataURL(myFile)
            })
            .catch(err => {
                console.error('image display error : ', err);
            })
    }

    return (
        <div className="preview-box">
            <ImgWrapper src={imgSrc} alt={""} className={"thumbnail"}/>
            <p>{imageData.oldName}</p>
            <a href={'#'} onClick={handleOnClick} value={imageData.imageStep}>삭제</a>
        </div>
    )
}

export default ImageOldPreviewForm;