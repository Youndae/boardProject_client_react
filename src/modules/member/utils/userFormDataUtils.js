import { getEmail } from './userValidator';

export const setJoinFormData = (joinData, emailSuffix) => {
    const formData = setFormDataByNicknameAndEmailAndProfile(joinData, emailSuffix);

    formData.append('userId', joinData.userId);
    formData.append('password', joinData.userPw);
    formData.append('userName', joinData.userName);

    return formData;
}

export const setModifyProfileFormData = (userData, emailSuffix) => {
    return setFormDataByNicknameAndEmailAndProfile(userData, emailSuffix);
}

const setFormDataByNicknameAndEmailAndProfile = (userData, emailSuffix) => {
    const formData = new FormData();
    const email = getEmail(userData, emailSuffix);

    formData.append('nickname', userData.nickname);
    formData.append('email', email);

    if(userData.profile !== '' || userData.profile)
        formData.append('profile', userData.profile);

    return formData;
}