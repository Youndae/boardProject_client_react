import React from 'react';

import ImageBoardListItem from './ImageBoardListItem';
import Button from '../ui/Button';

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
                        <ImageBoardListItem
                            key={image.imageNo}
                            image={image}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default ImageBoardList;