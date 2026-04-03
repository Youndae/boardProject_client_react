import React from 'react';

function Button(props) {
    const {btnText, onClick, value} = props;

    return (
        <button className='btn btn-outline-info btn-sm' onClick={onClick} value={value}>
            {btnText}
        </button>
    )

}

export default Button;