import React from 'react';
import styled from 'styled-components';

import ImageBoardList from "../../list/ImageBoardList";

import data from '../../../imageData.json';

function ImagePage(props) {
    const {} = props;

    return (
        <ImageBoardList
            image={data}
        />
    );
}

export default ImagePage;