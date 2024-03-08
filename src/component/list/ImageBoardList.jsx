import React from 'react';
import styled from 'styled-components';

import ImageBoardListItem from './ImageBoardListItem';
import Button from '../ui/Button';

const Wrapper = styled.div``;

function ImageBoardList(props) {
    const { image } = props;

    return (
        <div className="container">
            <Button
                btnText="글작성"
                btnDivClassName="mb-4"
            />
            <div className="row">
                {image.map((image, indx) => {
                    return (
                        <ImageBoardListItem
                            image={image}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default ImageBoardList;