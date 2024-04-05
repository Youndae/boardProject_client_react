import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {customImageAxios} from "../../modules/customAxios";
import axios from "axios";

const Image = styled.img`
    width: 300px;
    height: 300px;
`;


function ImageBoardListItem(props) {

    const {image, onClick} = props;
    const [imageSrc, setImageSrc] = useState('');

    // const imageName = 'http://192.168.0.15:9096/image-board/display/' + image.imageName;

    useEffect(() => {
        console.log('useEffect');
        getImageData(image.imageName);
    }, [image]);

    const getImageData = async (imageName) => {

        await customImageAxios.get(`display/${imageName}`)
            .then(res => {
                // console.log('get ImageData res : ', res);
                let tester;
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
        <div className="col-md-4">
            <a onClick={onClick}>
                <Image className="imageData" src={imageSrc}/>
                <p>{image.imageTitle}</p>
            </a>
        </div>
    );
}

export default ImageBoardListItem;