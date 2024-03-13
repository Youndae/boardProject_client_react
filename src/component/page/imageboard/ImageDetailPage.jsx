import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../../ui/Button";

function ImageDetailPage(props) {
    const { imageNo } = useParams();
    const { imageInfo } = props;

    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="form-row float-right mb-3">
                <Button
                    btnText="수정"
                    onClick={() => {
                        navigate(`/image/update/${imageNo}`)
                    }}
                />
                <Button
                    btnText="삭제"
                    onClick={() => {
                        navigate(`/image/delete/${imageNo}`)
                    }}
                />
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
                <p>{imageInfo.imageDate}</p>
            </div>
            <div className="form-group">
                <label>내용</label>
                <div className="mt-4">
                    <div className="mb-4">
                        {/*<img />*/}
                    </div>
                </div>
                <p>{imageInfo.imageContent}</p>
            </div>
        </div>
    )
}

export default ImageDetailPage;
