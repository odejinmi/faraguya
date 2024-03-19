const  jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const isAuthorize = async(req, res, next) =>{

const token = req.body.token || req.query.token || req.headers["authorization"];

// const token = req.headers.authorization || req.headers.authorization.startsWith("Bearer") || req.headers.authorization.split(" ")[1]
   if (!token){
       return res.status(403).json({
           success: false,
           message: 'A token is required for authentication'
       })
   }
    try{
        const authToken = token.split(' ')[1];
        const decode = jwt.verify(authToken, JWT_SECRET);

        req.developer = decode.developer;
    }catch (error) {
        console.log(error.message);
        return res.status(403).json({
            success: false,
            message: 'Invalid Token'
        })
    }

   return next();
};


module.exports = isAuthorize;