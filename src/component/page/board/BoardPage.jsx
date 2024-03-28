import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import {customAxios} from "../../../modules/customAxios";

import TextBoardList from '../../list/TextBoardList';


const default_url = process.env.REACT_APP_API_URL;

function BoardPage(props) {
    console.log('default url : ', default_url);
    const {} = props;
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const navigate = useNavigate();

    const getBoardList = async (pageNum) => {
        try{
            const response = await customAxios.get(`/board/board-list?pageNum=${pageNum}`);

            console.log('boardPage res.data : ', response.data);

            setData(response.data.content);
        }catch(err) {
            console.error('axios err : ', err);
        }
    }

    useEffect(() => {
        getBoardList(pageNum);
    }, [pageNum]);


    return (
        <div className="container">
            <TextBoardList
                data={data}
                onClickItem={(item) => {
                    navigate(`/board/${item.boardNo}`)
                }}
                onClickBtn={() => {
                    navigate('/board/insert')
                }}
            />
        </div>
    );
}

export default BoardPage;