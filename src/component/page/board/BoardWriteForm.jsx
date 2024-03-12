import React from 'react';
import styled from 'styled-components';
import { useState } from "react";

import Button from "../../ui/Button";

const BoardWriteForm = (props) => {
    const { data } = props;
    const [values, setValues] = useState({
        title: data == null ? "" : data.boardTitle,
        content: data == null ? "" : data.boardContent,
    });

    const handleChange = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    };

    const submitEvent = () => {
        props.handleData(values);
    }

    return (
        <>
            <div>
                <label>제목</label>
                <input type="text" placeholder="제목을 입력하세요" name="title" value={values.title} onChange={handleChange}/>
            </div>
            <div className="mb-4">
                <label>내용</label>
                <textarea placeholder="내용을 입력하세요" name="content" value={values.content} onChange={handleChange}>{values.content}</textarea>
            </div>
            <Button
                btnText="등록" onClick={submitEvent}
            />
        </>
    );
}


/*function BoardWriteForm(props) {
    const { data } = props;

    const [values, setValues] = useState({
        title: "",
        content: "",
    });

    const handleChange = (e) => {
        console.log("handleChange");
        console.log("e.target.name : ", e.target.name);
        console.log("e.target.value : ", e.target.value);
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })
    }

    const [inputVal, setInputVal] = useState('');
    const [textVal, setTextVal] = useState('');

    const handleChangeInput = (e) => {
        e.preventDefault();
        console.log('handle input');
        setInputVal(e.target.value);
        console.log('set input val : ' + inputVal);
    }

    const handleChangeText = (e) => {
        e.preventDefault();
        console.log('handle text');
        setTextVal(e.target.value);
        console.log('set text val : ' + textVal);
    }

    /!*function ValueInput(props) {
        const { value } = props;

        return <input type="text" placeholder="제목을 입력하세요" value={value} onChange={handleChangeInput}/>;
    }

    function DefaultInput() {
        return <input type="text" placeholder="제목을 입력하세요" onChange={handleChangeInput}/>;
    }

    function ValueTextarea(props) {
        const { value } = props;

        return <textarea placeholder="내용을 입력하세요" onChange={handleChangeText}>{value}</textarea>;
    }

    function DefaultTextarea() {
        return <textarea placeholder="내용을 입력하세요" onChange={handleChangeText}></textarea>;
    }*!/

    // let input = <DefaultInput />;
    // let textarea = <DefaultTextarea />;
    let bno = null;
    let onClickBtn = '/board/insertProc';

    if(data !== undefined) {
        /!*input = <ValueInput value={data.boardTitle}/>;
        textarea = <ValueTextarea value={data.boardContent}/>;*!/
        setInputVal(data.boardTitle);
        setTextVal(data.boardContent);

        if (data.length == 1) {
            bno = <input type="hidden" name="boardNo" value={data}/>;
            onClickBtn = '/board/replyProc';
        }else {
            bno = <input type="hidden" name="boardNo" value={data.boardNo}/>;
            onClickBtn = '/board/updateProc';
        }
    }

    const submitEvent = () => {
        console.log("input : ", values.title);
        console.log("text : ", values.content);
        props.getFormData(values);
    }


    return (
        <>
            <div>
                <label>제목</label>
                <input type="text" placeholder="제목을 입력하세요" name="title" value={values.title} onChange={handleChange}/>
            </div>
            <div className="mb-4">
                <label>내용</label>
                <textarea placeholder="내용을 입력하세요" name="content" value={values.content} onChange={handleChange}>{values.content}</textarea>
            </div>
            <Button
                btnText="등록" onClick={submitEvent}
            />
        </>
    );

}*/

export default BoardWriteForm;