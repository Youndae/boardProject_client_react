import React from 'react';

function DisabledButton(props) {
    const {btnText, onClick, value} = props;

    return (
        <button className='btn btn-outline-info btn-sm' onClick={onClick} value={value} disabled={true}>
            {btnText}
        </button>
    )

}

export default DisabledButton;