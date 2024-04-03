import React from 'react';

const BoardWriteForm = (props) => {
    const { values, handleChange } = props;

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
        </>
    );
}

export default BoardWriteForm;