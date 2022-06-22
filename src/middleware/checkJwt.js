const jwt = require('jsonwebtoken');

function checkJwt(req, res, next) {

    const token = req.headers['auth'];
    let jwtPayload;

    try {
        jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return res.status(401).send({
            message: "Not Authorized"
        });
    }
    const { id } = jwtPayload;

    const newToken = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRIED });
    res.setHeader('token', newToken);
    //Next function
    next();

}

module.exports = {
    checkJwt
};