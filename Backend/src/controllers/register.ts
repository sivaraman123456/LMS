import {config} from "dotenv";
import sgmail from "@sendgrid/mail"
import Appdata from "../datasource/datasource";
import { Student } from "../entities/user";
import bcrypt from "bcrypt"
import {jwtGenerator} from "../utils/jwtgenerator" 
import { Request,Response} from "express";

config();

Appdata.initialize().then(()=>{
    console.log("Database successfully connected..!");
    }).catch((err)=>{
    console.error("Database connection error");
    })


 const register=async(req:Request,res:Response)=>{
    try {
        var API_KEY:any=process.env.MAIl_API;
        sgmail.setApiKey(API_KEY)     
const {name,email,password,role}=req.body;
const  emailInfo={
    to:`${email}`,
    from:'sivaraman9344043151@gmail.com',
    subject:"Register ",
    html:`<h1 style="color:blue; font-family:Arial, sans-serif;">${name} Successfully Registered In!</h1>`
}
sgmail.send(emailInfo)
.then((response)=>{console.log(response,"Email sent");
})
.catch(error=>{console.log(error,"Email not sent");
})
let userRepo=Appdata.getRepository(Student);

let existingUser = await userRepo.findOne({ where: { email:email } });
if( existingUser)
    {
       return  res.json("user already exists..")
    }
const saltRound=10;
const salt= await bcrypt.genSalt(saltRound)
const bcryptpass= await bcrypt.hash(password,salt);

const user1=new Student();
user1.name=name;
user1.email=email;
user1.password=bcryptpass;
user1.role="user";
await userRepo.save(user1)

let userid=user1.id;
let token=jwtGenerator({id:userid});
 res.json({token:token})
   
} catch (error) {
        console.error(error);
        res.json("error .....")
}
}
export default register;