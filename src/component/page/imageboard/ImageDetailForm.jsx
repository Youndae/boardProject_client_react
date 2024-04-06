import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { customImageAxios } from "../../../modules/customAxios";

const Image = styled.img`
    width: 300px;
    height: 300px;
`;

function ImageDetailForm(props) {
    const { imageData } = props;
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        getImageData(imageData.imageName);
    }, [imageData]);

    const getImageData = async (imageName) => {
        await customImageAxios.get(`display/${imageName}`)
            .then(res => {
                const myFile = new File([res.data], 'imageName')
                const reader = new FileReader()
                reader.onload = ev => {
                    const previewImage = String(ev.target?.result)
                    setImageSrc(previewImage)
                }
                reader.readAsDataURL(myFile)
            })
            .catch(err => {
                console.error('imageData axios error : ', err);
            })
    }

    return (
        <div className="mb-4">
            <Image className={"imageData"} src={imageSrc} />
        </div>
    )
}

export default ImageDetailForm;