import jwt from "jsonwebtoken";
import {config} from 'dotenv';

config();

export  function jwtGenerator(id:any){
const payload={user:id}
return jwt.sign(payload,process.env.jwt_secret!,{expiresIn:"1hr"})
}
