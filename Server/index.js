const express=require("express")
const app=express()
const cors=require("cors")
//middleware
app.use(cors())
app.use(express.json())

const multer  = require('multer')
app.use("/files",express.static("files"))

//routes
// routes login and register
app.use("/auth",require("./routes/jwtAuth"));
//dashboard
app.use("/dashboard",require("./routes/dashboard"));
//fileupload
app.use("/fileupload",require("./routes/fileupload"))
app.listen("5000",()=>{
console.log("server is running..! 5000");
})