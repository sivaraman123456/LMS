"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const validation = (req, res, next) => {
    const { name, email, password } = req.body;
    function validEmail(email) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    if (req.path === "/register") {
        if (![name, email, password].every(Boolean)) {
            res.json("Missing credential");
        }
        else if (!validEmail(email)) {
            res.json("Invalid email");
        }
    }
    else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            res.json("Missing credential");
        }
        else if (!validEmail(email)) {
            res.json("Invalid email");
        }
    }
    next();
};
exports.validation = validation;
