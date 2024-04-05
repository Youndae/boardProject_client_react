import React from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

import ImageBoardListItem from './ImageBoardListItem';
import Button from '../ui/Button';

const Wrapper = styled.div``;

function ImageBoardList(props) {
    const { image, onClickItem, onClickBtn } = props;
    const navigate = useNavigate();

    console.log('image.imageNo : ', image);

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
                            onClick={() => {
                                onClickItem(image)
                            }}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default ImageBoardList;