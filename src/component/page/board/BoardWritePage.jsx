import React, { useState } from 'react';

import BoardWriteForm from './BoardWriteForm';
import Button from "../../ui/Button";

function BoardWritePage (props) {

    function handleSubmit(e) {
        e.preventDefault();

        console.log("handleSubmit");
        console.log("values.title : ", values.title);
        console.log("values.content: ", values.content);
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