const jwt = require('jsonwebtoken');
const mysqlconnection = require('../database');

function checkRole(roles) {
    return async (req, res, next) => {
        const  {id}  = res.locals.jwtPayload;
        let userId = JSON.stringify({id});
        let role;
        try {
            await mysqlconnection.query("SELECT * FROM users WHERE idUsers = ?", [userId], (err, results, fiels) => {
                if (results.length > 0) {
                    role = results[0].role;
                    if (!roles.includes(role)) {
                        return res.status(401).json({
                            message: "Not Authorized"
                        });
                    } else {
                        next();
                    }
                } else {
                    return res.status(401).json({
                        message: "Not Authorized"
                    });
                }
            });
        } catch (e) {
            return res.status(500).send({
                message: "it has been generated error in server"
            });
        }
    }
}

module.exports = checkRole;

