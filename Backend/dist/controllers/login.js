"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = __importDefault(require("@sendgrid/mail"));
const datasource_1 = __importDefault(require("../datasource/datasource"));
const user_1 = require("../entities/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtgenerator_1 = require("../utils/jwtgenerator");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var API_KEY = process.env.MAIl_API;
        mail_1.default.setApiKey(API_KEY);
        const { email, password } = req.body;
        const emailInfo = {
            to: `${email}`,
            from: 'sivaraman9344043151@gmail.com',
            subject: "Login ",
            html: `<h1 style="color:green; font-family:Arial, sans-serif;">Successfully Logged In!</h1>`
        };
        console.log("login");
        mail_1.default.send(emailInfo)
            .then((response) => {
            console.log(response, "Email sent");
        })
            .catch(error => {
            console.log(error, "Email not sent");
        });
        let userRepo = datasource_1.default.getRepository(user_1.Student);
        let existingUser = yield userRepo.findOne({ where: { email: email } });
        if (!existingUser) {
            return res.send("password or email invalid");
        }
        const validpass = bcrypt_1.default.compare(password, existingUser.password);
        if (!validpass) {
            return res.send("password in valid");
        }
        let userid = existingUser.id;
        let token = (0, jwtgenerator_1.jwtGenerator)({ id: userid });
        res.send({ token: token });
    }
    catch (error) {
        console.error(error);
    }
});
exports.default = login;
