const jwt = require('jsonwebtoken')
const JWTSEC = '#2@!@$ndja45883 r7##'

const verifytoken = (req, res, next) =>{
    const authHeader = req.headers.token;
          if(authHeader){
                    const token = authHeader;
                    jwt.verify(token , JWTSEC , (err , user)=>{
                              if(err) return res.status(400).json("Terjadi error di verifytoken");
                              req.user = user;
                              next();
                    } )
          }else{
                    return res.status(400).json("Tokennya tidak ada dan tidak bisa diakses")
          }
}

module.exports = {verifytoken}