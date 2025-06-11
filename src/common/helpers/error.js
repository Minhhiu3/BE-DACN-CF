const createError = (statusCode, message) => {
    const error = new Error(message || "lỗi do server or ....");
    error.statusCode = statusCode || 500;
    return error;
};

export default createError;