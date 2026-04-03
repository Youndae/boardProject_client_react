import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import Button from '../../../common/components/Button';
import CommentList from '../../comment/components/CommentList';
import ImageDisplay from '../components/ImageDisplay';

import { getDetail, deleteImageBoard } from '../services/imageBoardService';
import {useSelector} from "react-redux";
import {IMAGE_SIZE} from "../constants/imageSizeConstants";

function ImageBoardDetailPage() {
    const { id } = useParams();
    const [boardData, setBoardData] = useState({
        title: '',
        content: '',
        writer: '',
        writerId: '',
        createdAt: '',
    });
    const [imageData, setImageData] = useState([]);
    const uid = useSelector((state) => state.member.id) ?? null;
    const navigate = useNavigate();

    useEffect(() => {
        const getImageDetailData = async (imageId) => {
            try {
                const res = await getDetail(imageId);
                const data = res.data.content;

                setBoardData({
                    title: data.title,
                    content: data.content,
                    writer: data.writer,
                    writerId: data.writerId,
                    createdAt: data.createdAt,
                });
                setImageData(data.imageDataList);
            }catch(err) {
                console.error('Failed get image board detail: ', err);
            }
        }

        getImageDetailData(id);
    }, [id]);

    const handleDeleteBtn = async () => {
        try {
            await deleteImageBoard(id);
            navigate('/image');
        }catch(err) {
            console.error('Failed delete image board: ', err);
        }
    }

    const isWriter = uid === boardData.writerId;

    return (
        <div className="container">
            <div className="form-row float-right mb-3">
                {isWriter &&
                    <>
                        <Button
                            btnText={'수정'}
                            onClick={() => {
                                navigate(`/image/update/${id}`)
                            }}
                        />
                        <Button
                            btnText={'삭제'}
                            onClick={handleDeleteBtn}
                        />
                    </>
                }
            </div>
            <div className="form-group">
                <label>제목</label>
                <p>{boardData.title}</p>
            </div>
            <div className="form-group">
                <label>작성자</label>
                <p>{boardData.writer}</p>
            </div>
            <div className="form-group">
                <label>작성일</label>
                <p>{dayjs(boardData.createdAt).format('YYYY-MM-DD')}</p>
            </div>
            <div className="form-group">
                <label>내용</label>
                <div className="mt-4">
                    {imageData.map((imageData, index) => {
                        return (
                            <div key={index} className="mb-4">
                                <ImageDisplay
                                    imageClassName={'imageData'}
                                    imageName={imageData}
                                    type={'board'}
                                    size={IMAGE_SIZE.MEDIUM}
                                />
                            </div>
                        )
                    })}
                </div>
                <p>{boardData.content}</p>
            </div>
            <CommentList
                imageId={id}
            />
        </div>
    )
}

export default ImageBoardDetailPage;