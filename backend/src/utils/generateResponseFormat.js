export const generateResponseFormat = (
    message,
    statusCode,
    status,
    data = null,
) => {
    return {
        message,
        statusCode,
        status,
        data,
    }
}