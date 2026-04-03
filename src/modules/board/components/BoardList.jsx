import React from 'react';

import BoardItem from './BoardItem';
import Button from '../../../common/components/Button';


function BoardList(props) {
    const { data, onClickBtn } = props;

    return (
        <div>
            <div className="form-row float-right mb-1">
                <Button
                    btnText="글작성"
                    onClick={() => {
                        onClickBtn()
                    }}
                />
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>글번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((data, index) => {
                        return (
                            <BoardItem
                                key={data.id}
                                board={data}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default BoardList;