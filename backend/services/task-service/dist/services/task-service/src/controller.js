"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.createTaskController = createTaskController;
exports.updateTaskStatusController = updateTaskStatusController;
exports.getTask = getTask;
exports.getMyTasks = getMyTasks;
exports.approveTaskController = approveTaskController;
exports.getProjectActivityController = getProjectActivityController;
exports.getAllActivityController = getAllActivityController;
const taskService = __importStar(require("./service"));
const schema_1 = require("./schema");
function createTaskController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = Object.assign({}, req.body);
        // Default ownerId to the authenticated user if not provided (assignment)
        if (!body.ownerId && req.userId) {
            body.ownerId = req.userId;
        }
        const parsed = schema_1.createTaskSchema.safeParse(body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error });
        }
        try {
            yield taskService.createTask(parsed.data);
            return res.status(201).json({ message: "Task created successfully" });
        }
        catch (error) {
            console.error("Task creation failed:", error);
            return res.status(500).json({ error: error.message || "Internal Server Error" });
        }
    });
}
function updateTaskStatusController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const parsed = schema_1.updateStatusScehma.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error });
        }
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        try {
            yield taskService.updateTaskStatus(req.params.id, userId, parsed.data.status);
            res.json({ message: "Task status updated successfully" });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getTask(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tasks = yield taskService.listTask(req.params.projectId);
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getMyTasks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const tasks = yield taskService.listUserTasks(userId);
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function approveTaskController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            yield taskService.approveTask(req.params.id, userId);
            res.json({ message: "Task approved successfully" });
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getProjectActivityController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activity = yield taskService.getProjectActivity(req.params.projectId);
            res.json(activity);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
function getAllActivityController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userId = req.userId;
            if (!userId) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const activity = yield taskService.getAllUserActivity(userId);
            res.json(activity);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
