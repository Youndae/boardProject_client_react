import React, {useEffect, useState} from 'react';

import {useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

import {handleLocationPathToLogin} from "../../../modules/loginModule";
import MemberProfile from "../../ui/MemberProfile";

function ModifyProfile() {

    const [userStatus, setUserStatus] = useState(null);

    const loginStatus = useSelector(state => state.user);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(loginStatus === 'loggedIn')
            setUserStatus(true);
        else if(loginStatus === 'loggedOut')
            handleLocationPathToLogin(pathname, navigate);
    }, [loginStatus]);

    if(userStatus){

        const profileType = 'update';
        const btnText = '수정';
        const navigateUrl = '/';
        const successMessage = '수정이 완료되었습니다.';

        return (
            <div className="container">
                <div className="layer">
                    <MemberProfile
                        profileType={`${profileType}`}
                        btnText={`${btnText}`}
                        navigateUrl={`${navigateUrl}`}
                        successMessage={`${successMessage}`}
                    />
                </div>
            </div>
        )
    }
}

export default ModifyProfile;
