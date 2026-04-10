export const parseResponseCodeAndMessage = (error) => {
    const code = error.response?.data.code ?? 0;
    const message = error.response?.data.message ?? '';

    return { code, message }
}