import { Request, Response, NextFunction } from 'express';

export const validation = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, password } = req.body;

    function validEmail(email: string): boolean {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }

    if (req.path === "/register") {
        if (![name, email, password].every(Boolean)) {
             res.json("Missing credential");
        } else if (!validEmail(email)) {
             res.json("Invalid email");
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
             res.json("Missing credential");
        } else if (!validEmail(email)) {
             res.json("Invalid email");
        }
    }
    next();
};
