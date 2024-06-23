"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = __importDefault(require("../controllers/register"));
const login_1 = __importDefault(require("../controllers/login"));
const authoraization_1 = __importDefault(require("../middlewares/authoraization"));
const validation_1 = require("../middlewares/validation");
const verify_1 = __importDefault(require("../controllers/verify"));
const router = (0, express_1.Router)();
router.post("/register", validation_1.validation, register_1.default);
router.post("/login", login_1.default);
router.get("/verify", authoraization_1.default, verify_1.default);
exports.default = router;
