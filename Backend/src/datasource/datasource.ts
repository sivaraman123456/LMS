import { DataSource } from "typeorm";
import { Student } from "../entities/user";
import { Fileupload } from "../entities/file"; 
const Appdata=new DataSource({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"postgres",
    password:"root",
    database:"learning",
    logging:true,
    synchronize:true,
    entities:[
       Student,
       Fileupload 
       ]
})
export default Appdata;
