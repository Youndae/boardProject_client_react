import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";


import Button from "../../ui/Button";
import CommentList from "../../list/CommentList";

import {imageAxios, axiosErrorHandling} from "../../../modules/customAxios";
import ImageDisplayElem from "../../ui/ImageDisplayElem";

function ImageDetailPage(props) {
    const { imageNo } = useParams();
    const [imageInfo, setImageInfo] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [uid, setUid] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        getImageDetailData(imageNo);
    }, [imageNo]);

    const getImageDetailData = async (imageNo) => {
        await imageAxios.get(`${imageNo}`)
            .then(res => {
                setImageInfo(res.data.content);
                setImageData(res.data.content.imageData);
                setUid(res.data.userStatus.uid);
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    const writer = imageInfo.userId;
    let modifyBtn = null;
    let deleteBtn = null;
    if(uid === writer){
        modifyBtn = <Button
                        btnText="수정"
                        onClick={() => {
                            navigate(`/image/update/${imageNo}`)
                        }}
                    />;

        deleteBtn = <Button
                        btnText="삭제"
                        onClick={() => {
                            navigate(`/image/delete/${imageNo}`)
                        }}
                    />;
    }


    return (
        <div className="container">
            <div className="form-row float-right mb-3">
                {modifyBtn}
                {deleteBtn}
            </div>
            <div className="form-group">
                <label>제목</label>
                <p>{imageInfo.imageTitle}</p>
            </div>
            <div className="form-group">
                <label>작성자</label>
                <p>{imageInfo.userId}</p>
            </div>
            <div className="form-group">
                <label>작성일</label>
                <p>{dayjs(imageInfo.imageDate).format('YYYY-MM-DD')}</p>
            </div>
            <div className="form-group">
                <label>내용</label>
                <div className="mt-4">
                    {imageData.map((imageData, index) => {
                        return (
                            <div key={index} className="mb-4">
                                <ImageDisplayElem
                                    imageClassName={'imageData'}
                                    imageName={imageData.imageName}
                                />
                            </div>
                        )
                    })}
                </div>
                <p>{imageInfo.imageContent}</p>
            </div>
            <CommentList
                imageNo={imageNo}
            />
        </div>
    )
}

export default ImageDetailPage;
