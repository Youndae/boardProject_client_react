import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {customAxios} from "../../../modules/customAxios";

import BoardDetailForm from "./BoardDetailForm";
import CommentList from "../../list/CommentList";


const board_default = process.env.REACT_APP_API_BOARD;
function BoardDetailPage () {
    const { boardNo } = useParams();
    const [data, setData] = useState([]);
    const [uid, setUid] = useState('');

    useEffect(() => {
        boardDetailData(boardNo);
    }, []);

    const boardDetailData = async (boardNo) => {
        try{
            const response = await customAxios.get(`${board_default}${boardNo}`);

            setData(response.data.content);
            setUid(response.data.userStatus.uid);
        }catch (err) {
            console.error('detail error : ', err);
        }
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