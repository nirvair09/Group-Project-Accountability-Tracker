"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.get("/health", (req: Request, res: Response) => {
//   res.json({ status: "sabb changa sii", service: "task-service" });
// });
app.use(routes_1.default);
app.listen(process.env.TASK_PORT, () => {
    console.log("Task Service is running on port:", process.env.TASK_PORT);
});
