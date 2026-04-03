import React from 'react';

import ImageBoardItem from "./ImageBoardItem";
import Button from '../../../common/components/Button';

function ImageBoardList(props) {
    const { image, onClickBtn } = props;

    return (
        <div className="container">
            <div className="mb-4">
                <Button
                    btnText="글작성"
                    onClick={() => {
                        onClickBtn();
                    }}
                />
            </div>
            <div className="row">
                {image.map((image, index) => {
                    return (
                        <ImageBoardItem
                            key={image.id}
                            image={image}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default ImageBoardList;