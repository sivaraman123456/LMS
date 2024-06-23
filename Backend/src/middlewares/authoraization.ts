import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();
const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let jwtToken:any = req.header("token");
        console.log(jwtToken);
        if (!jwtToken) {
            res.json("Invalid authorization");
        }
        const payload = jwt.verify(jwtToken, process.env.jwt_secret!)as { user: any }
        req.header= payload.user;
        console.log(req.header);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export default authMiddleware;