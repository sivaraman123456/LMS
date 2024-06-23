const mongoose=require("mongoose")
const mongoose_url=mongoose.connect("mongodb://localhost:27017/files",{
    useNewUrlParser:true,}).then(()=>{
        console.log("connected to database mongoDB");
    }).catch((e)=>console.log(e))

    module.exports.mongoose_url;