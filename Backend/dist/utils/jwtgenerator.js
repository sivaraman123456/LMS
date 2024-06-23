"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtGenerator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function jwtGenerator(id) {
    const payload = { user: id };
    return jsonwebtoken_1.default.sign(payload, process.env.jwt_secret, { expiresIn: "1hr" });
}
exports.jwtGenerator = jwtGenerator;
