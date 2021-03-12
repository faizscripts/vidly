module.exports = function (req, res, next) {
    //assume this will be called after the auth middleware so we will have req.user

    if (!req.user.isAdmin) return res.status(403).send('Access denied');

    next();
}