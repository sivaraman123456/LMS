const router = require('express').Router();
const pool = require('../db');

// middleware
const authorization = require('../middleware/authorization');

// Return the user info to users who are authorized 
router.get('/', authorization, async (req, res) => {
    try {
        // req.user has the payload of token from the middleware 
 const user = await pool.query("select name,email,password from student where user_id=$1",
     [req.user]);
    res.json(user.rows[0]);
     }
      catch (err) {
        console.error(err.message);
        res.status(500).json("server error");
    }
});

module.exports = router;