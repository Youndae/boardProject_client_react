import React from 'react';

import ImageDisplayElem from "../ui/ImageDisplayElem";
import {Link} from "react-router-dom";

function ImageBoardListItem(props) {
    const { image } = props;

    return (
        <div className="col-md-4">
            <Link to={`/image/${image.imageNo}`}>
                <ImageDisplayElem
                    imageClassName={'imageData'}
                    imageName={image.imageName}
                />
                <p>{image.imageTitle}</p>
            </Link>
        </div>
    );
}

export default ImageBoardListItem;