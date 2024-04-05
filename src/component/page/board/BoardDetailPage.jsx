import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import {customAxios} from "../../../modules/customAxios";

import BoardDetailForm from "./BoardDetailForm";
import CommentList from "../../list/CommentList";

// import data from '../../../data.json';

const board_default = process.env.REACT_APP_API_BOARD;

function BoardDetailPage (props) {
    const {} = props;
    const { boardNo } = useParams();
    const [data, setData] = useState([]);
    const [uid, setUid] = useState('');
    console.log('boardNo : ', boardNo);
    /*useEffect(() => {
        console.log('useEffect');
        boardDetailData(boardNo);
        console.log('effect end');
    });*/


    /*useEffect(() => {
        console.log('useEffect');
        boardDetailData(boardNo);
        console.log('useEffect end');
    }, [boardNo]);*/

    useEffect(() => {
        console.log('useEffect');
        boardDetailData(boardNo);
    }, []);

    const boardDetailData = async (boardNo) => {
        try{
            console.log('detail axios');
            const response = await customAxios.get(`${board_default}${boardNo}`);
            console.log('detail response : ', response);
            setData(response.data.content);
            setUid(response.data.userStatus.uid);
        }catch (err) {
            console.error('detail error : ', err);
        }
    }






    /*const boardDetailData = async (boardNo)=> {
        try{
            const response = await customAxios.get(`${board_default}${boardNo}`);
            console.log('boardDetail response : ', response);
            setData(response.data.content);
        }catch(err) {
            console.error('axios err : ', err);
        }
    }*/




    /*const board = data.find((item) => {
        return item.boardNo == boardNo;
    });*/

    return (
        <div className="container">
            <BoardDetailForm
                boardInfo={data}
                uid={uid}
            />
            {/*comment*/}
            <CommentList
                boardNo={boardNo}
            />
        </div>
    );
}

export default BoardDetailPage;