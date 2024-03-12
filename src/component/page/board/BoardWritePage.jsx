import React from 'react';

import BoardWriteForm from './BoardWriteForm';

function BoardWritePage (props) {

    function handleSubmit(e) {
        e.preventDefault();

        console.log("handleSubmit");
        /*const { inputVal, textVal } = e.props;
        console.log("submit!!");

        const title2 = inputVal;
        console.log('title2 : ' + title2);

        // const content2 = e.target.children.textarea.value();
        const content2 = textVal;
        console.log('content2 : ' + content2);*/
    }

    const handleData = (values) => {
        console.log("title : ", values.title);
        console.log("content : ", values.content);

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <BoardWriteForm handleData={handleData} />
            </form>
        </div>
    );
}

export default BoardWritePage;