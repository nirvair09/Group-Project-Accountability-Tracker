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
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const env_1 = require("./config/env");
const shared_1 = require("@gpa/shared");
app_1.app.listen(env_1.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Auth service running on port ${env_1.env.PORT}`);
    try {
        yield shared_1.pool.query("SELECT NOW()");
        console.log("DB Connected");
    }
    catch (e) {
        console.error("DB Connection Failed", e);
    }
}));
