import React, { useEffect, useState } from "react";
import styled from 'styled-components';

import { getImageData } from '../../../common/service/commentService';

const ProfilePreview = styled.div`
    position: relative;
    width: 300px;
    height: 300px;
`

const ProfileImg = styled.img`
    width: 300px;
    height: 300px;
    vertical-align: middle;
    border-style: none;
`

const ProfileButton = styled.button`
    padding: 4px;
    position: absolute;
    top: 0px;
    left: 260px;
    font-size: medium;
`

function MemberProfileImage(props) {
    const {
        profileImg,
        profileStatus,
        handleProfileDeleteOnClick,
        handleProfileOnChange
    } = props;
    const defaultImg = `${process.env.PUBLIC_URL}/default-profile.png`;
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        let objectUrl = '';
        let isCancelled = false;

        const getImageDisplayData = async (imageName) => {
            try {
                const image = await getImageData('profile', imageName);
                if(!isCancelled)
                    setImgSrc(image);
            }catch (err) {
                console.error('Failed profile image display', err);
            }
        }

        if(profileStatus === 'default')
            setImgSrc(defaultImg);
        else if(profileStatus === 'old')
            getImageDisplayData(profileImg);
        else {
            objectUrl = getObjectURL(profileImg);
            setImgSrc(objectUrl);
        }

        return () => {
            isCancelled = true;
            if (objectUrl)
                window.URL.revokeObjectURL(objectUrl);
        }
    }, [profileImg, profileStatus]);

    const getObjectURL = (file) => window.URL.createObjectURL(file);

    return (
        <div className="mb-2">
            <ProfilePreview className={'profile-preview'}>
                <label htmlFor="profile-image">
                    <ProfileImg src={imgSrc}/>
                </label>
                {profileStatus !== 'default' &&
                    <ProfileButton className={'btn btn-outline-info btn-sm'} onClick={handleProfileDeleteOnClick}>삭제</ProfileButton>
                }
                <input
                    type={'file'}
                    id={'profile-image'}
                    name={'profile-image'}
                    style={{display: 'none'}}
                    onChange={handleProfileOnChange}
                    onClick={(e) => {e.target.value = null}}
                />
            </ProfilePreview>
        </div>
    )
}

export default MemberProfileImage;