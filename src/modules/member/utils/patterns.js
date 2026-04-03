export const PATTERNS = {
    USERID: /^[A-Za-z0-9]{5,15}$/,
    PASSWORD: /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-])(?=.*[0-9]).{8,16}$/,
    EMAIL: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    NICKNAME: /^[가-힣a-zA-Z0-9]{2,15}$/i,
    USERNAME: /^[가-힣a-zA-Z0-9]{2,15}$/i,
}