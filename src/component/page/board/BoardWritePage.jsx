import React, { useEffect, useState } from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {customAxios} from "../../../modules/customAxios";

import BoardWriteForm from './BoardWriteForm';
import Button from "../../ui/Button";

const board_default = process.env.REACT_APP_API_BOARD;
function BoardWritePage (props) {
    const isLoggedIn = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn)
            navigate(`/login`);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("handleSubmit");
        console.log("values.title : ", values.title);
        console.log("values.content: ", values.content);

        await customAxios.post(`${board_default}`, {
            boardTitle: values.title,
            boardContent: values.content,
        })
        .then(res => {
            console.log('board insert res : ', res);
            const insertNo = res.data;
            navigate(`/board/${insertNo}`)
        })
        .catch(err => {
            console.error('board insert axios error : ', err);
        });



        /*const { inputVal, textVal } = e.props;
        console.log("submit!!");

        const title2 = inputVal;
        console.log('title2 : ' + title2);

        // const content2 = e.target.children.textarea.value();
        const content2 = textVal;
        console.log('content2 : ' + content2);*/
    }

    const [values, setValues] = useState({
        title: "",
        content: "",
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    };



    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm values={values} handleChange={handleChange} />
                <Button
                    btnText="등록"
                />
            </form>
        </div>
    );
}

export default BoardWritePage;