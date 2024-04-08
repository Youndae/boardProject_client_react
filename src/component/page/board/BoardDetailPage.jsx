import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

import BoardDetailForm from "./BoardDetailForm";
import CommentList from "../../list/CommentList";

import {axiosErrorHandling, boardAxios} from "../../../modules/customAxios";

function BoardDetailPage () {
    const { boardNo } = useParams();
    const [data, setData] = useState([]);
    const [uid, setUid] = useState('');

    useEffect(() => {
        boardDetailData(boardNo);
    }, []);

    const boardDetailData = async (boardNo) => {

        await boardAxios.get(`${boardNo}`)
            .then(res => {
                setData(res.data.content);
                setUid(res.data.userStatus.uid);
            })
            .catch(err => {
                axiosErrorHandling(err);
            });
    }

    return (
        <div className="container">
            <BoardDetailForm
                boardInfo={data}
                uid={uid}
            />
            <CommentList
                boardNo={boardNo}
            />
        </div>
    );
}

export default BoardDetailPage;