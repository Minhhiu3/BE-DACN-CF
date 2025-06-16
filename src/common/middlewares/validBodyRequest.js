const validBodyRequest = (schema) => (req, res, next) => {
    try {
        const data = schema.parse(req.body);
        req.data = data;
        next();
    } catch (err) {
        const error = err.errors?.[0]; // Dùng optional chaining

        return res.status(400).json({
            success: false,
            status: 400,
            message: error
                ? `${error.path}: ${error.message}`
                : 'Sai định dạng dữ liệu',
            data: null
        });
    }
};
export default validBodyRequest;