const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validinfo")
const authorization = require("../middleware/authorization")
const jwt = require("jsonwebtoken");
// const jwt_decode =require("jwt-decode");
//register route
router.post("/register", validInfo, async (req, res) => {
    try {
        //1.destructure the req.body(name,email,password)
        const { name, email, password } = req.body
        //2.check if user exists(If user exists than throw error)
        const user = await pool.query("SELECT * FROM Student where email=$1", [email])
        if (user.rows.length !== 0) {
            return res.json("user already exists....")
        }
        //3.bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        console.log(bcryptPassword)
        //4. enter the new user inside the DB
        // save user 
        const newUser = await pool.query("insert into student (name,email,password, role) values($1,$2,$3,$4) returning *",
            [name, email, bcryptPassword,"user"]);
        //5.generate the jwt 
        const token = jwtGenerator({user_id: newUser.rows[0].user_id, role: newUser.rows[0].role});
        console.log(newUser.rows[0].role,newUser.rows[0].user_id);
        var decode1 = jwt.decode(token);
console.log("without leading space");
console.log(decode1);
        res.json({ token })
    } catch (err) {
        console.log(err.message);
        res.send("server Error")
    }
})
router.post("/login", validInfo, async (req, res) => {
    try {
        //1.destructure the reg.body
        const { email, password } = req.body;
        //2.check if user doesn't exist(than throw error)
        const user = await pool.query("select * from student where email=$1  ", [email]);
        if (user.rows.length === 0) 
        {
            return res.status(400).json({ message: "email or password incorrect..."});
        }
    //3.check if in coming password is the same the database password.
        const validpassword = await bcrypt.compare(password, user.rows[0].password)
        if (!validpassword) 
        {
            return res.json("Password or Email incorrect....")
        }
        // console.log("USER:",user); //4.give them the :jwt token
        const token = jwtGenerator(user.rows[0].user_id, user.rows[0].role);
        console.log(user.rows[0].role,user.rows[0].user_id);
        var decode1 = jwt.decode(token);
        console.log({decode1});
        res.json({ token })
      }
    catch (err) {
        console.error(err.message);
        res.json("server Error")
    }
})
router.get("/verify", authorization, async (req, res) => {
    try {
        res.json(true)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server Error")
    }
})

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
module.exports = router