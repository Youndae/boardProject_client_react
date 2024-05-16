
export function handleLocationPathToLogin(pathname, navigate){
    if(pathname === '/login' || pathname === '/join')
        pathname = '/';

    navigate('/login', {state: pathname});
}

export const setJoinFormData = (values, email) => {
    let formData = new FormData();

    formData.append('userId', values.userId);
    formData.append('userPw', values.userPw);
    formData.append('userName', values.userName);
    formData.append('email', email);
    formData.append('nickname', values.nickname);
    formData.append('profileThumbnail', values.profileThumbnail);

    return formData;
}