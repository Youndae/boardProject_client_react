import {INFO_CHECK} from "../constants/userInfoCheckConstants";
import {PATTERNS} from "./patterns";

export const getEmail = (userData, suffix) => `${userData.email}@${suffix}`;

export const validateJoin = (checkInfo, userData, emailSuffix) => {
    const resultArr = [
        validateUserId(checkInfo.idCheckInfo, userData.userId),
        validatePassword(checkInfo.pwCheckInfo, userData.userPw),
        validateUsername(userData.userName),
        validateNickname(userData.nickname, checkInfo.nicknameInfo),
        validateEmail(userData, emailSuffix)
    ];

    return resultArr.filter(Boolean);
}

export const validateModifyProfile = (checkInfo, userData, emailSuffix) => {
    const resultArr = [
        validateNickname(userData, checkInfo),
        validateEmail(userData, emailSuffix)
    ];

    return resultArr.filter(Boolean);
}

export const validateOAuthProfile = (checkInfo, nickname) => {
    const resultArr = [
        validateNickname(nickname, checkInfo),
    ];

    return resultArr.filter(Boolean);
}

export const validateNicknameValue = (nickname) => {
    if(!nickname || nickname === ''){
        return {
            result: false,
            checkValue: INFO_CHECK.EMPTY
        }
    }else if(!PATTERNS.NICKNAME.test(nickname)){
        return {
            result: false,
            checkValue: INFO_CHECK.INVALID
        }
    }
}

export const validateUserIdValue = (userId) => {
    if(!userId || userId === ''){
        return {
            result: false,
            checkValue: INFO_CHECK.EMPTY
        }
    }else if(!PATTERNS.USERID.test(userId)){
        return {
            result: false,
            checkValue: INFO_CHECK.INVALID
        }
    }
}

const validateUserId = (checkInfo, userId) => {
    if(!checkInfo){
        return {
            result: false,
            field: 'userId',
            checkValue: INFO_CHECK.NOT_DUPLICATED_CHECK
        }
    }else if(!PATTERNS.USERID.test(userId)){
        return {
            result: false,
            field: 'userId',
            checkValue: INFO_CHECK.INVALID
        }
    }
}

const validatePassword = (checkInfo, password) => {
    if(!checkInfo || !PATTERNS.PASSWORD.test(password)){
        return {
            result: false,
            field: 'userPw',
            checkValue: INFO_CHECK.INVALID,
        }
    }
}

const validateUsername = (userName) => {
    if(userName === '' || !userName){
        return {
            result: false,
            field: 'userName',
            checkValue: INFO_CHECK.EMPTY,
        }
    }else if(!PATTERNS.USERNAME.test(userName)) {
        return {
            result: false,
            field: 'userName',
            checkValue: INFO_CHECK.INVALID
        }
    }
}

const validateNickname = (nickname, checkInfo) => {
    if(nickname === '' || !nickname) {
        return {
            result: false,
            field: 'nickname',
            checkValue: INFO_CHECK.EMPTY,
        }
    }else if(!checkInfo) {
        return {
            result: false,
            field: 'nickname',
            checkValue: INFO_CHECK.NOT_DUPLICATED_CHECK
        }
    }else if(!PATTERNS.NICKNAME.test(nickname)){
        return {
            result: false,
            field: 'nickname',
            checkValue: INFO_CHECK.INVALID
        }
    }
}

const validateEmail = (userData, emailSuffix) => {
    if(!PATTERNS.EMAIL.test(getEmail(userData, emailSuffix))){
        return {
            result: false,
            field: 'email',
            checkValue: INFO_CHECK.INVALID,
        }
    }
}