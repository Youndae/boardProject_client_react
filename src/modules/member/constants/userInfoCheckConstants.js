export const INFO_CHECK = Object.freeze({
    VALID: 'VALID',
    INVALID: 'INVALID',
    DUPLICATED: 'DUPLICATED',
    NOT_DUPLICATED_CHECK: 'NOT_DUPLICATED_CHECK',
    ERROR: 'ERROR',
    EMPTY: 'EMPTY',
    SHORT: 'SHORT'
});

export const USER_ID_INFO_CHECK_MESSAGE = (value) => {
    const messages = {
        [INFO_CHECK.EMPTY]: '아이디를 입력하세요',
        [INFO_CHECK.INVALID]: '영문자와 숫자를 사용한 5 ~ 15 자리만 가능합니다',
        [INFO_CHECK.DUPLICATED]: '이미 사용중인 아이디입니다',
        [INFO_CHECK.VALID]: '사용 가능한 아이디입니다',
        [INFO_CHECK.ERROR]: '오류가 발생했습니다. 문제가 계속되면 문의해주세요',
        [INFO_CHECK.NOT_DUPLICATED_CHECK]: '아이디 중복 체크를 해주세요',
    }

    return messages[value] || '';
}

export const PASSWORD_INFO_CHECK_MESSAGE = (value) => {
    const messages = {
        [INFO_CHECK.EMPTY]: '비밀번호를 입력하세요',
        [INFO_CHECK.INVALID]: '비밀번호는 영어, 특수문자, 숫자가 포함되어야 합니다',
        [INFO_CHECK.VALID]: '사용 가능한 비밀번호입니다',
        [INFO_CHECK.SHORT]: '비밀번호는 8자리 이상이어야 합니다',
    }

    return messages[value] || '';
}

export const CHECK_PASSWORD_INFO_CHECK_MESSAGE = (value) => {
    const messages = {
        [INFO_CHECK.EMPTY]: '비밀번호가 일치하지 않습니다',
        [INFO_CHECK.INVALID]: '비밀번호가 일치하지 않습니다',
    }

    return messages[value] || '';
}

export const USER_NAME_INFO_CHECK_MESSAGE = (value) => {
    const messages = {
        [INFO_CHECK.EMPTY]: '이름을 입력해주세요',
        [INFO_CHECK.INVALID]: '이름은 2글자 이상 15자리 미만이어야 합니다.'
    }

    return messages[value] || '';
}

export const NICK_NAME_INFO_CHECK_MESSAGE = (value) => {
    const messages = {
        [INFO_CHECK.EMPTY]: '닉네임을 입력하세요',
        [INFO_CHECK.DUPLICATED]: '이미 사용중인 닉네임입니다',
        [INFO_CHECK.VALID]: '사용 가능한 닉네임입니다',
        [INFO_CHECK.INVALID]: '닉네임은 2글자 이상 15자리 미만이어야 합니다.',
        [INFO_CHECK.ERROR]: '오류가 발생했습니다. 문제가 계속되면 문의해주세요',
        [INFO_CHECK.NOT_DUPLICATED_CHECK]: '닉네임 중복 체크를 해주세요',
    }

    return messages[value] || '';
}

export const EMAIL_INFO_CHECK_MESSAGE = (value) => {
    const messages = {
        [INFO_CHECK.EMPTY]: '이메일을 입력하세요',
        [INFO_CHECK.INVALID]: '유효하지 않은 이메일 주소입니다',
    }

    return messages[value] || '';
}