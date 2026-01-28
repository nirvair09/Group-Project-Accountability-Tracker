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
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const shared_1 = require("@gpa/shared");
const uuid_1 = require("uuid");
const registerUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existing = yield shared_1.pool.query(`select id from users where email=$1`, [email]);
    if (existing.rows[0]) {
        throw new Error("User already exists");
    }
    const userId = (0, uuid_1.v4)();
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const result = yield shared_1.pool.query(`insert into users (id, name, email, password) values ($1, $2, $3, $4) RETURNING id, name, email`, [userId, name, email, hashedPassword]);
    return result.rows[0];
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield shared_1.pool.query(`select * from users where email=$1`, [email]);
    if (!result.rowCount) {
        throw new Error("User not found");
    }
    const user = result.rows[0];
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error("Invalid password");
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email
    };
});
exports.loginUser = loginUser;
