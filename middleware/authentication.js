const jwt = require("jsonwebtoken")

const authentication = async(req,res,next)=>{
    const token = req.headers.authorization;
    if (token){
        jwt.verify(token, 'shhhhh', function(err, decoded) {
            if (err){
                res.send({"msg":"Somthing went wrong","error":err})
            }
            else {
                req.body.userID = decoded.userID
                req.body.name = decoded.name
                next();
            }
          });
    }
    else {
        res.send({"msg":"You Need to Login first"})
    }
}


module.exports = {
    authentication
}