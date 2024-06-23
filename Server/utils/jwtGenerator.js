const jwt =require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id,role)
{
const payload={user:user_id,role:role}
// console.log(payload);
return jwt.sign(payload,process.env.jwt_secret,{expiresIn:"1hr"})
}
module.exports=jwtGenerator;