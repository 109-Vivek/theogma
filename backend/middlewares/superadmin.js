const jwt = require("jsonwebtoken");
const superAdminJWTSecret = process.env.SUPER_ADMIN_JWT_SECRET;


//admin authentication logic comes here
function authorizeSuperAdmin(req,res,next)
{
    const {authorization} = req.headers;
    const token = authorization.split(" ")[1];
    try{
        const decoded = jwt.verify(token,superAdminJWTSecret); 
        next();
    }catch(error)
    {
        res.status(403).json({msg : "Authorization Failed"});
    }
}
module.exports = {
    authorizeSuperAdmin
}