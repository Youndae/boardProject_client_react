import React from 'react';

import BoardWriteForm from './BoardWriteForm';

function BoardWritePage (props) {

    function handleSubmit(e) {
        e.preventDefault();

        const { inputVal, textVal } = e.props;
        console.log("submit!!");

        const title2 = inputVal;
        console.log('title2 : ' + title2);

        // const content2 = e.target.children.textarea.value();
        const content2 = textVal;
        console.log('content2 : ' + content2);
    }

    const dataFunction = (inputVal) => {
        const values = inputVal;
        console.log('dataFunction inputVal : ', values);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} propFunction={dataFunction}>
                <BoardWriteForm />
            </form>
        </div>
    );
}

export default BoardWritePage;