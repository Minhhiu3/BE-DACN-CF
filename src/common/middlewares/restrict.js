const restrict = (role) => {
    return (req,res,next) => {
        if (!req.user || !req.user.role || !role.includes(req.user.role)) {
            return res.status(403).json({ message : "acces denied"});
        }
        next();
    }
}