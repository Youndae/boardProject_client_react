import axios  from 'axios';

/*
* axios list
* board
* image_default
* image_multipart
* comment
* member
*
* axios error handling
*/

const default_url = process.env.REACT_APP_API_URL;
const board_default = process.env.REACT_APP_API_BOARD;
const image_default = process.env.REACT_APP_API_IMAGE;
const comment_default = process.env.REACT_APP_API_COMMENT;
const member_default = process.env.REACT_APP_API_MEMBER;

const default_header = {
    'Content-Type' : 'application/json',
}

export const boardAxios = axios.create({
    baseURL: `${default_url}${board_default}`,
    headers: default_header,
    withCredentials: true,
});

export const imageAxios = axios.create({
    baseURL: `${default_url}${image_default}`,
    headers: default_header,
    withCredentials: true,
});

export const imageDisplayAxios = axios.create({
    baseURL: `${default_url}${image_default}`,
    headers: default_header,
    withCredentials: true,
    responseType: 'blob',
});


export const imageInsertAxios = axios.create({
    baseURL: `${default_url}${image_default}`,
    headers: {
        'Content-Type' : 'multipart/form-data',
    },
    withCredentials: true,
})

export const commentAxios = axios.create({
    baseURL: `${default_url}${comment_default}`,
    headers: default_header,
    withCredentials: true,
})

export const memberAxios = axios.create({
    baseURL: `${default_url}${member_default}`,
    headers: default_header,
    withCredentials: true,
})

export const checkUserStatus = async () => {
    return await memberAxios.get(`check-login`)
        .catch(err => {
            axiosErrorHandling(err);
        });
}



//error handling
export const axiosErrorHandling = (err) => {
    const err_code = err.response.status;

    if(err_code === 403){
        //accessDenied
        window.location.href = '/error';
    }else if(err_code === 800){
        //tokenStealing
        alert('로그인 정보에 문제가 있어 로그아웃되었습니다.\n다시 로그인해주세요');
        window.location.href = '/login';
    }else if(err_code >= 400 && err_code < 500){
        //4xx error
        alert('문제가 발생했습니다.\n문제가 계속된다면 관리자에게 문의해주세요');
    }else if(err_code >= 500 && err_code < 600){
        //5xx error
        alert('문제가 발생했습니다.\n문제가 계속된다면 관리자에게 문의해주세요');
    }
}
