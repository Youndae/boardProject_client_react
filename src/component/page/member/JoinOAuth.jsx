import React from 'react';
import MemberProfile from "../../ui/MemberProfile";

function JoinOAuth() {

    const profileType = 'join';
    const btnText = '등록';
    const navigateUrl = window.sessionStorage.getItem('prev');
    const successMessage = '등록이 완료되었습니다.';

    return (
        <div className="container">
            <div className="mb-5">
                <h4>추가 사항 입력 후 가입을 완료해주세요</h4>
                <p>* 표시는 필수 입력 사항입니다.</p>
            </div>

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

export default JoinOAuth;