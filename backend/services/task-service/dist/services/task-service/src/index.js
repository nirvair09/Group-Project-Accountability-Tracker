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
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.get("/health", (req: Request, res: Response) => {
//   res.json({ status: "sabb changa sii", service: "task-service" });
// });
app.use(routes_1.default);
const shared_1 = require("@gpa/shared");
const PORT = process.env.PORT || process.env.TASK_PORT || 4003;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Task Service is running on port:", PORT);
    try {
        yield shared_1.pool.query("SELECT NOW()");
        console.log("DB Connected");
    }
    catch (e) {
        console.error("DB Connection Failed", e);
    }
}));
