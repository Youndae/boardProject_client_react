import { parseResponseCodeAndMessage } from "./responseErrorUtils";

export const responseInterceptor = async (error) => {
    const { code, message } = parseResponseCodeAndMessage(error);

    if(code === 401){
        console.log("error: ", message);
        alert('로그인 정보에 문제가 발생해 로그아웃됩니다.\n문제가 계속된다면 관리자에게 문의해주세요.');
        window.location.href = '/';
    }else if(code === 403 || code === 404) {
        console.log("error: ", message);
        window.location.href = '/error';
    }else if(code === 500) {
        console.log("error: ", message);
        alert('오류가 발생했습니다.\n서비스 이용에 불편을 드려 죄송합니다.\n문제가 계속된다면 관리자에게 문의해주세요.');
        window.location.href = '/';
    }

    return Promise.reject(error);
}