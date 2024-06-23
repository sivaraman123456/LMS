"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_files_1 = require("../controllers/upload_files");
const router = (0, express_1.Router)();
router.post("/upload-files", upload_files_1.files);
router.get("/get-files");
router.delete("/delete-file");
exports.default = router;
