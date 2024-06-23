import { Router } from "express";
import register from "../controllers/register";
import login from "../controllers/login";
import authorization from "../middlewares/authoraization";
import { validation } from "../middlewares/validation"
import verify from "../controllers/verify";
const router=Router()


router.post("/register",validation,register)
router.post("/login",login)
router.get("/verify",authorization,verify)


export default router;