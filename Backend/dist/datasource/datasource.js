"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const file_1 = require("../entities/file");
const Appdata = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "learning",
    logging: true,
    synchronize: true,
    entities: [
        user_1.Student,
        file_1.Fileupload
    ]
});
exports.default = Appdata;
