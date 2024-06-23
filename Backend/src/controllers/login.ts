import sgmail from "@sendgrid/mail"
import Appdata from "../datasource/datasource";
import { Student } from "../entities/user";
import bcrypt from "bcrypt"
import {jwtGenerator} from "../utils/jwtgenerator" 
import { Request,Response, response} from "express";
import { config } from "dotenv";
config();
const login=async(req:Request,res:Response)=>{
try {
        var API_KEY:any=process.env.MAIl_API;
        sgmail.setApiKey(API_KEY)
const {email,password}=req.body
const emailInfo={
    to:`${email}`,
    from:'sivaraman9344043151@gmail.com',
    subject:"Login ",
    html:`<h1 style="color:green; font-family:Arial, sans-serif;">Successfully Logged In!</h1>`
}
console.log("login");
sgmail.send(emailInfo)
.then((response)=>{console.log(response,"Email sent");
})
.catch(error=>{console.log(error,"Email not sent");
})
  
let userRepo=Appdata.getRepository(Student);
let existingUser = await userRepo.findOne({ where: { email:email } });
if( !existingUser)
    {
    
    return res.send("password or email invalid")
}

const validpass=bcrypt.compare(password,existingUser.password)
if (!validpass)
{
    return res.send("password in valid")
}

let userid=existingUser.id;
let token=jwtGenerator({id:userid});

res.send({token:token})
} 

catch (error) {
        console.error(error);
    }
}


export default login;