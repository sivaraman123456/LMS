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
exports.files = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const datasource_1 = __importDefault(require("../datasource/datasource"));
const file_1 = require("../entities/file");
const files = () => {
    // Configure multer storage options
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './files');
        },
        filename: function (req, file, cb) {
            // Generate unique file names
            cb(null, `${file.fieldname}-${Date.now()}${path_1.default.extname(file.originalname)}`);
        }
    });
    // Initialize multer with the storage options
    const upload = (0, multer_1.default)({ storage: storage });
    // Middleware for file upload
    upload.fields([{ name: 'file', maxCount: 1 }, { name: 'image', maxCount: 1 }]);
    // Upload handler
    (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const fileRepo = datasource_1.default.getRepository(file_1.Fileupload);
        const file1 = new file_1.Fileupload();
        const { unit, subject, sem, category } = req.body;
        const file = (_a = req.files['file']) === null || _a === void 0 ? void 0 : _a[0];
        const image = (_b = req.files['image']) === null || _b === void 0 ? void 0 : _b[0];
        if (file && image) {
            file1.unit = unit;
            file1.subject = subject;
            file1.sem = sem;
            file1.image = image.filename;
            file1.pdf = file.filename;
            file1.catagory = category;
            try {
                yield fileRepo.save(file1);
                res.json({ success: true, message: "Data added" });
            }
            catch (error) {
                console.error(error);
                res.json({ success: false, message: "Error saving data" });
            }
        }
        else {
            res.status(400).json({ success: false, message: "Files are missing" });
        }
    });
};
exports.files = files;
