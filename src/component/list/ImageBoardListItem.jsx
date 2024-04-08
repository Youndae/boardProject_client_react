import React, {useEffect, useState} from 'react';
import styled from 'styled-components';

import {axiosErrorHandling, imageDisplayAxios} from "../../modules/customAxios";

const Image = styled.img`
    width: 300px;
    height: 300px;
`;

function ImageBoardListItem(props) {

    const {image, onClick} = props;
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        getImageData(image.imageName);
    }, [image]);

    const getImageData = async (imageName) => {
        await imageDisplayAxios.get(`display/${imageName}`)
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
                axiosErrorHandling(err);
            })
    }

    return (
        <div className="col-md-4">
            <a onClick={onClick}>
                <Image className="imageData" src={imageSrc}/>
                <p>{image.imageTitle}</p>
            </a>
        </div>
    );
}

export default ImageBoardListItem;