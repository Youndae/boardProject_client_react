import React from 'react';
import styled from 'styled-components';

const LabelWrapper = styled.label`
    flex: 0 0 auto;
`

const TitleWrapper = styled.div`
    display: inline-flex;
    margin-bottom: 15px;
    width: 100%;
`

const TitleInputWrapper = styled.input`
    margin-left: 10px;
    width: 100%;
`

const ContentWrapper = styled.div`
    height: 400px;
    display: flex;
    flex-direction: column;
`

const ContentInputWrapper = styled.textarea`
    flex: 1 1 auto;
    width: 100%;
    resize: none;
    padding: 10px;
    box-sizing: border-box;
`

function BoardWriteForm(props) {
    const { values, handleChange } = props;

    return(
        <>
            <TitleWrapper className="write-title">
                <LabelWrapper>제목</LabelWrapper>
                <TitleInputWrapper type={'text'} placeholder={'제목을 입력하세요'} name={'title'} value={values.title} onChange={handleChange}/>
            </TitleWrapper>
            <ContentWrapper className="mb-4 write-content">
                <label>내용</label>
                <ContentInputWrapper placeholder={'내용을 입력하세요'} name={'content'} value={values.content} onChange={handleChange}>{values.content}</ContentInputWrapper>
            </ContentWrapper>
        </>
    );
}

export default BoardWriteForm;