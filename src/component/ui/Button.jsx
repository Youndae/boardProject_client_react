import React from 'react';
import styled from 'styled-components';

function Button(props) {
    const {btnText, btnDivClassName, onClick} = props;

    return (
        <div className={btnDivClassName}>
            <button className='btn btn-outline-info btn-sm' onClick={onClick}>
                {btnText}
            </button>
        </div>
    )

}

export default Button;