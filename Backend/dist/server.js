"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileupload_1 = __importDefault(require("./routers/fileupload"));
const authentication_1 = __importDefault(require("./routers/authentication"));
const swagger_1 = require("./swagger/swagger");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors"));
const PORT = 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); //--destructure req.body
//swager
app.use("/files", express_1.default.static("files"));
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swagger_api));
app.use("/auth", authentication_1.default);
app.use("/fileupload", fileupload_1.default);
app.listen(PORT, () => {
    console.log("Server running successfully on:", PORT);
});
