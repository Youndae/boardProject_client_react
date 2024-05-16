import React from 'react';
import MemberProfile from "../../ui/MemberProfile";

function ModifyProfile() {

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

export default ModifyProfile;
