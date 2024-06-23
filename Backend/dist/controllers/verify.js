"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verify = (req, res) => {
    try {
        res.json(true);
    }
    catch (error) {
        console.error(error);
    }
};
exports.default = verify;
