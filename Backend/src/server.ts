import express,{Request,Response} from "express";
import file from "./routers/fileupload";
import jwtAuth from "./routers/authentication"
import {swagger_api} from './swagger/swagger'
import swaggerui from "swagger-ui-express"
import cors from "cors"
const PORT=5000
const app=express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))//--destructure req.body
//swager
app.use("/files",express.static("files"))
app.use("/api-docs",swaggerui.serve,swaggerui.setup(swagger_api))
app.use("/auth",jwtAuth)
app.use("/fileupload",file)
app.listen(PORT,()=>{
console.log("Server running successfully on:",PORT);
})
