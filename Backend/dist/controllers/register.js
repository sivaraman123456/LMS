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
const dotenv_1 = require("dotenv");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const datasource_1 = __importDefault(require("../datasource/datasource"));
const user_1 = require("../entities/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtgenerator_1 = require("../utils/jwtgenerator");
(0, dotenv_1.config)();
datasource_1.default.initialize().then(() => {
    console.log("Database successfully connected..!");
}).catch((err) => {
    console.error("Database connection error");
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var API_KEY = process.env.MAIl_API;
        mail_1.default.setApiKey(API_KEY);
        const { name, email, password, role } = req.body;
        const emailInfo = {
            to: `${email}`,
            from: 'sivaraman9344043151@gmail.com',
            subject: "Register ",
            html: `<h1 style="color:blue; font-family:Arial, sans-serif;">${name} Successfully Registered In!</h1>`
        };
        mail_1.default.send(emailInfo)
            .then((response) => {
            console.log(response, "Email sent");
        })
            .catch(error => {
            console.log(error, "Email not sent");
        });
        let userRepo = datasource_1.default.getRepository(user_1.Student);
        let existingUser = yield userRepo.findOne({ where: { email: email } });
        if (existingUser) {
            return res.json("user already exists..");
        }
        const saltRound = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRound);
        const bcryptpass = yield bcrypt_1.default.hash(password, salt);
        const user1 = new user_1.Student();
        user1.name = name;
        user1.email = email;
        user1.password = bcryptpass;
        user1.role = "user";
        yield userRepo.save(user1);
        let userid = user1.id;
        let token = (0, jwtgenerator_1.jwtGenerator)({ id: userid });
        res.json({ token: token });
    }
    catch (error) {
        console.error(error);
        res.json("error .....");
    }
});
exports.default = register;
