import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

import BoardDetailForm from "./BoardDetailForm";

// import data from '../../../data.json';


function BoardDetailPage (props) {
    const {} = props;
    const { boardNo } = useParams();
    const [data, setData] = useState({});
    console.log('boardNo : ', boardNo);

    const boardDetailData = async (boardNo)=> {
        try{
            const response = await axios.get(`http://localhost:9096/board/board-detail/${boardNo}`);
            setData(response.data);
        }catch(err) {
            console.error('axios err : ', err);
        }
    }

    useEffect(() => {
        boardDetailData(boardNo);
    }, []);


    /*const board = data.find((item) => {
        return item.boardNo == boardNo;
    });*/

    return (
        <div className="container">
            <BoardDetailForm
                boardInfo={data}
            />
            {/*comment*/}
        </div>
    );
}

export default BoardDetailPage;