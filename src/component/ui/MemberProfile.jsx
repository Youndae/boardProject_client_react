import React, {useEffect, useRef, useState} from 'react';

import Button from "./Button";
import MemberNickname from "./MemberNickname";
import MemberProfileImage from "./MemberProfileImage";

import {axiosErrorHandling, memberAxios, memberProfileAxios, memberProfileGetAxios} from "../../modules/customAxios";
import {imageValidation} from "../../modules/imageModule";
import {useNavigate} from "react-router-dom";


function MemberProfile(props) {
    const { profileType, btnText, navigateUrl, successMessage } = props;

    const [userData, setUserData] = useState({
        nickname: "",
        profileThumbnail: "",
    })
    const [nicknameCheck, setNicknameCheck] = useState('');
    const [nicknameDuplicateCheck, setNicknameDuplicateCheck] = useState(false);
    const [deleteProfile, setDeleteProfile] = useState('');
    const [profileStatus, setProfileStatus] = useState('default');
    const nicknameElem = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(profileType === 'update'){
            getMemberProfile();
        }
    }, [profileType]);

    const getMemberProfile = async () => {
        await memberProfileGetAxios.get(`profile`)
            .then(res => {
                const nick = res.data.nickname === null ? "" : res.data.nickname;
                const profile = res.data.profileThumbnail === null ? "" : res.data.profileThumbnail;

                setUserData({
                    ...userData,
                    nickname: nick,
                    profileThumbnail: profile,
                });

                if(profile !== '')
                    setProfileStatus('old');
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    const handleSubmit = () => {
        if(userData.nickname === '') {
            setNicknameCheck('empty');
            nicknameElem.current.focus();
        }else if(!nicknameDuplicateCheck){
            setNicknameCheck('notDuplicateCheck');
            nicknameElem.current.focus();
        }else {
            let formData = new FormData();

            let profileThumbnail;
            if(profileStatus === 'default' || profileStatus === 'old')
                profileThumbnail = null;
            else
                profileThumbnail = userData.profileThumbnail;

            formData.append('nickname', userData.nickname);
            formData.append('profileThumbnail', profileThumbnail);
            if(deleteProfile !== '')
                formData.append('deleteProfile', deleteProfile);


            memberProfileAxios.patch('profile', formData)
                .then(() => {
                    alert(successMessage);
                    window.sessionStorage.removeItem('prev');
                    navigate(navigateUrl);
                })
                .catch(err => {
                    axiosErrorHandling(err);
                })
        }
    }

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })

        setNicknameDuplicateCheck(false);
    }

    const handleCheckNickname = () => {
        if(userData.nickname === '')
            setNicknameCheck('empty');
        else{
            memberAxios.get(`check-nickname?nickname=${userData.nickname}`)
                .then(res => {
                    if(res.data === 1){
                        setNicknameDuplicateCheck(false);
                        setNicknameCheck('duplication');
                    }else {
                        setNicknameDuplicateCheck(true);
                        setNicknameCheck('valid');
                    }
                })
                .catch(() => {
                    setNicknameCheck('err');
                })
        }
    }

    const handleProfileDeleteOnClick = (e) => {
        if(profileStatus === 'old')
            setDeleteProfile(userData.profileThumbnail);
        else
            window.URL.revokeObjectURL(userData.profileThumbnail);

        setUserData({
            ...userData,
            profileThumbnail: '',
        });
        setProfileStatus('default');
    }

    const handleProfileOnChange = (e) => {
        if(e.target.files.length !== 0){
            if(imageValidation(e)){
                const file = e.target.files[0];
                setUserData({
                    ...userData,
                    profileThumbnail: file,
                });
            }

            setProfileStatus('new');
        }
    }

    return (
        <>
            <MemberNickname
                nickname={userData}
                handleChange={handleChange}
                nicknameElem={nicknameElem}
                handleCheckNickname={handleCheckNickname}
                nicknameCheck={nicknameCheck}
            />
            <MemberProfileImage
                profileImg={userData.profileThumbnail}
                profileStatus={profileStatus}
                handleProfileDeleteOnClick={handleProfileDeleteOnClick}
                handleProfileOnChange={handleProfileOnChange}
            />
            <Button
                btnText={`${btnText}`}
                onClick={handleSubmit}
            />
        </>
    )
}

export default MemberProfile;