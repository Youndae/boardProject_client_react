import React from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";

import ImageBoardListItem from './ImageBoardListItem';
import Button from '../ui/Button';

const Wrapper = styled.div``;

function ImageBoardList(props) {
    const { image } = props;
    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="mb-4">
                <Button
                    btnText="글작성"
                    onClick={() => {
                        navigate(`/image/insert`)
                    }}
                />
            </div>
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