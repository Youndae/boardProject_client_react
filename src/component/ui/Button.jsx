import React from 'react';
import styled from 'styled-components';

function Button(props) {
    const {btnText, onClick} = props;

    return (
        <button className='btn btn-outline-info btn-sm' onClick={onClick}>
            {btnText}
        </button>
    )

}

export default Button;