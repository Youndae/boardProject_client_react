import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ImgWrapper = styled.img`
    width: 300px;
    height: 300px;
`

const DeleteBtnWrapper = styled.button`
    background: none;
    border: none;
    margin-bottom: 10px;
`

function ImageNewPreviewForm(props) {
    const { handleOnClick, files } = props;
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        const url = window
            .URL
            .createObjectURL(
                files.file
            );
        setImgSrc(url);
    }, [files]);

    return (
        <div className="preview-box">
            <ImgWrapper
                src={imgSrc}
                alt={''}
                className={'thumbnail'}
            />
            <p>{files.file.name}</p>
            <DeleteBtnWrapper onClick={handleOnClick} value={files.fileNo}>삭제</DeleteBtnWrapper>
        </div>
    )
}

export default ImageNewPreviewForm;