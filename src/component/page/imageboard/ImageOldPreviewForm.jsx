import React from "react";

import ImageDisplayElem from "../../ui/ImageDisplayElem";
import {Link} from "react-router-dom";

function ImageOldPreviewForm(props) {
    const { imageData, handleOnClick } = props;

    return (
        <div className="preview-box">
            <ImageDisplayElem
                imageClassName={'thumbnail'}
                imageName={imageData.imageName}
            />
            <p>{imageData.oldName}</p>
            <Link onClick={handleOnClick} value={imageData.imageStep}>삭제</Link>
        </div>
    )
}

export default ImageOldPreviewForm;