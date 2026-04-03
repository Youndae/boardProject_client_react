import React from 'react';

function DisabledButton(props) {
    const { btnText } = props;

    return(
        <button className='btn btn-outline-info btn-sm' disabled={true}>
            {btnText}
        </button>
    )
}

export default DisabledButton;