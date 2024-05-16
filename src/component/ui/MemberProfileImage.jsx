import React, {useEffect, useState} from 'react';
import {axiosErrorHandling, imageDisplayAxios} from "../../modules/customAxios";

function MemberProfileImage(props) {
    const { profileImg, profileStatus, handleProfileDeleteOnClick, handleProfileOnChange } = props;
    const defaultImg = `${process.env.PUBLIC_URL}/default-profile.png`;

    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        if(profileStatus === 'default')
            setImgSrc(defaultImg);
        else if(profileStatus === 'old')
            getImageDisplayData(profileImg);
        else {
            getObjectURL(profileImg);
        }
    }, [profileImg]);

    const getObjectURL = (imageName) => {
        const url = window.URL.createObjectURL(imageName);

        setImgSrc(url);
    }

    const getImageDisplayData = async (imageName) => {
        await imageDisplayAxios.get(`display/${imageName}`)
            .then(res => {
                const image = new Blob([res.data], { type: res.headers['content-type']});
                getObjectURL(image);
            })
            .catch(err => {
                axiosErrorHandling(err);
            })
    }

    return (
        <div className="mb-2">
            <label className="mr-5 mb-2">프로필이미지</label>
            <div className="profile-preview" style={{position: "relative", width: "300px", height: "300px"}}>
                <label htmlFor={'profile-image'}>
                    <img
                        src={`${imgSrc}`}
                        style={{width: "300px", height: "300px", verticalAlign: "middle", borderStyle: "none"}}
                    />
                </label>
                <ProfileBtn
                    profileStatus={profileStatus}
                    handleOnClick={handleProfileDeleteOnClick}
                />
                <input
                    type={'file'}
                    id={'profile-image'}
                    name={'profile-image'}
                    style={{display: 'none'}}
                    onChange={handleProfileOnChange}
                    onClick={(e) => {e.target.value = null}}
                />
            </div>
        </div>
    )
}

function ProfileBtn (props) {
    const { profileStatus, handleOnClick} = props;

    if(profileStatus === 'default')
        return null;
    else
        return (
            <button className={'btn btn-outline-info btn-sm'} style={{padding: "4px", position: "absolute", top: "0px", left: "260px", fontSize: "medium"}} onClick={handleOnClick}>삭제</button>
        )
}

export default MemberProfileImage;