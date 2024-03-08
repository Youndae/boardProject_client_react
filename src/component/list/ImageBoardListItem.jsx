import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
    width: 300px;
    height: 300px;
`;


function ImageBoardListItem(props) {

    const {image, onClick} = props;

    return (
        <div className="col-md-4">
            <a>
                <Image className="imageData" src="../../../public/logo512.png"/>
                <p>{image.imageTitle}</p>
            </a>
        </div>
    );
}

export default ImageBoardListItem;