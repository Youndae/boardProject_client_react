import { parseResponseCodeAndMessage } from "./responseErrorUtils";

export const responseInterceptor = async (error) => {
    const { code, message } = parseResponseCodeAndMessage(error);

    if(code === 401){
        console.log("error: ", message);
        alert('로그인 정보에 문제가 발생해 로그아웃됩니다.\n문제가 계속된다면 관리자에게 문제해주세요.');
        window.location.href = '/';
    }else if(code >= 400) {
        console.log("error: ", message);
        window.location.href = '/error';
    }

    return Promise.reject(error);
}