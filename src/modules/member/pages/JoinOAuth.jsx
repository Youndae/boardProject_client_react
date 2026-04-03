import React, {useRef, useState} from 'react';

import MemberNicknameForm from "../component/MemberNicknameForm";
import MemberProfileImage from '../component/MemberProfileImage';
import {useNavigate, useSearchParams} from "react-router-dom";

import {
    postJoinDataByOAuthUser,
    checkNickname
} from "../services/memberService";

import { INFO_CHECK } from "../constants/userInfoCheckConstants";
import {imageValidation} from "../../../common/utils/imageUtils";
import Button from "../../../common/components/Button";
import {validateNicknameValue, validateOAuthProfile} from "../utils/userValidator";

function JoinOAuth() {
    const [ searchParams ] = useSearchParams();
    const [joinData, setJoinData] = useState({
        nickname: '',
        profile: '',
    });
    const [nicknameCheck, setNicknameCheck] = useState('');
    const [nicknameCheckInfo, setNicknameCheckInfo] = useState(false);
    const [profileStatus, setProfileStatus] = useState('default');
    const nicknameElem = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const validationResult = validateOAuthProfile(nicknameCheckInfo, joinData.nickname);

        if(!validationResult.length) {
            const formData = new FormData();

            formData.append('nickname', joinData.nickname);
            if(joinData.profile)
                formData.append('profile', joinData.profile);

            try {
                await postJoinDataByOAuthUser(formData);
                const encodedRedirect = searchParams.get('redirect');
                const redirectUrl = decodeURIComponent(encodedRedirect || '/');

                navigate(redirectUrl);
            }catch(err) {
                console.error('Failed post join OAuthUser Data');
            }
        }else {
            setNicknameCheck(validationResult[0].checkValue);
            nicknameElem.current.focus();
        }
    }

    const handleOnChange = (e) => {
        setJoinData({
            ...joinData,
            [e.target.name]: e.target.value,
        });

        setNicknameCheckInfo(false);
    }

    const handleCheckNickname = async () => {
        const nicknameValueValidationResult = validateNicknameValue(joinData.nickname);

        if(!nicknameValueValidationResult) {
            try {
                await checkNickname(joinData.nickname);
                setNicknameCheckInfo(true);
                setNicknameCheck(INFO_CHECK.VALID);
            }catch (err) {
                console.log('checkNickname error: ', err);
                if(err.status === 409) {
                    setNicknameCheckInfo(false);
                    setNicknameCheck(INFO_CHECK.DUPLICATED);
                }else {
                    setNicknameCheckInfo(false);
                    setNicknameCheck(INFO_CHECK.ERROR);
                }
            }
        }else {
            setNicknameCheck(nicknameValueValidationResult.checkValue);
            nicknameElem.current.focus();
        }
    }

    const handleProfileOnChange = (e) => {
        if(e.target.files.length && imageValidation(e)){
            const file = e.target.files[0];

            setJoinData({
                ...joinData,
                profile: file,
            })

            setProfileStatus('file');
        }
    }

    const handleProfileDeleteOnClick = () => {
        window.URL.revokeObjectURL(joinData.profile);
        setJoinData({
            ...joinData,
            profile: '',
        });
        setProfileStatus('default');
    }


    return (
        <div className="container">
            <div className="mb-5">
                <h4>추가 사항 입력 후 가입을 완료해주세요</h4>
                <p>* 표시는 필수 입력 사항입니다</p>
            </div>

            <div className="layer">
                <MemberNicknameForm
                    nicknameValue={joinData.nickname}
                    handleOnChange={handleOnChange}
                    nicknameElem={nicknameElem}
                    handleCheckNickname={handleCheckNickname}
                    nicknameCheck={nicknameCheck}
                />
                <MemberProfileImage
                    profileImg={joinData.profile}
                    profileStatus={profileStatus}
                    handleProfileDeleteOnClick={handleProfileDeleteOnClick}
                    handleProfileOnChange={handleProfileOnChange}
                />
                <Button
                    btnText={'수정'}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    )
}

export default JoinOAuth;