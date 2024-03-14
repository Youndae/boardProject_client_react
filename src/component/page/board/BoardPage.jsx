import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';


import TextBoardList from '../../list/TextBoardList';


// import data from '../../../data.json';

function BoardPage(props) {
    const {} = props;
    const [data, setData] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const navigate = useNavigate();

    const getBoardList = async (pageNum) => {
        try{
            const response = await axios.get(`http://localhost:9096/board/board-list?pageNum=${pageNum}`);

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