const jwt = require("jsonwebtoken");
require("dotenv").config();
const access_token_Key = process.env.access_token_Key;

const auth = (req, res, next) => {
    let token = req.cookies["token"] ||  req.headers.authorization; 
    console.log(token)

    try {
      

        if (token) {
            jwt.verify(token, access_token_Key, (err, decode) => {
                if (err) {
                    res.send({"msg": err});
                } else {
                    req.body.UserId = decode.UserId;
                    req.body.user = decode.user;
                    console.log(decode, req.body);
                    next();
                }
            });
        } else {
            res.send({"msg": "Token is not provided"});
        }
    } catch (error) {
        res.send({"msg": "Error in token verification"});
    }
};

module.exports = {auth};
