const router = require("express").Router()
const pool = require({"../db":any})

router.get("/data",async(req,res)=>{
    try {
        await pool.query("select * from student ")
        .then((data)=>{
            res.send({status:"ok",data:data})
            console.log(data);
        })

    } catch (error) {
        console.log(error);
        res.json({error:"data not found"})
    }
})