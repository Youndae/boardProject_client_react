import React, { useEffect, useState } from 'react';
import {customAxios} from "../../../modules/customAxios";

import ImageBoardList from "../../list/ImageBoardList";
import {useNavigate} from "react-router-dom";

// import data from '../../../imageData.json';

const image_default = process.env.REACT_APP_API_IMAGE;
function ImagePage(props) {
    const {} = props;
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(1);
    const navigate = useNavigate();

    const getImageList = async (pageNum) => {
        await customAxios.get(`${image_default}?pageNum=${pageNum}`)
            .then(res => {
                console.log('imageList res.data.content : ', res.data.content);
                setData(res.data.content);
            })
            .catch(err => {
                console.error('imageList axios error : ', err);
            });
    }

    useEffect(() => {
        getImageList(pageNum);
    }, [pageNum]);



    return (
        <ImageBoardList
            image={data}
            onClickItem={(item) => {
                navigate(`/image/${item.imageNo}`)
            }}
            onClickBtn={() => {
                navigate('/image/insert')
            }}
        />
    );
}

export default ImagePage;