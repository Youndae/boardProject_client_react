import React from 'react';

import ImageDisplay from './ImageDisplay';
import { Link } from 'react-router-dom';

import { IMAGE_SIZE } from "../constants/imageSizeConstants";

function ImageBoardItem(props) {
    const { image } = props;

    return (
        <div className="col-md-4">
            <Link to={`/image/${image.id}`}>
                <ImageDisplay
                    imageClassName={'imageData'}
                    imageName={image.imageName}
                    type={'board'}
                    size={IMAGE_SIZE.SMALL}
                />
                <p>{image.title}</p>
            </Link>
        </div>
    )
}

export default ImageBoardItem;