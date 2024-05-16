import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

function OAuthSuccess() {

    const navigate = useNavigate();

    useEffect(() => {
       const prev = window.sessionStorage.getItem('prev');
        window.sessionStorage.removeItem('prev');
       navigate(prev);
    });
}

export default OAuthSuccess;