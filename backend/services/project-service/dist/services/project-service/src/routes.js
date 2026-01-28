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
const express_1 = require("express");
const auth_1 = require("./middleware/auth");
const projectService = __importStar(require("./service"));
const router = (0, express_1.Router)();
// Get user's projects
router.get("/projects", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projects = yield projectService.getUserProjects(req.userId);
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Create new project
router.post("/projects", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: "Project name is required" });
        }
        const project = yield projectService.createProject(name, req.userId);
        res.status(201).json(project);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get project by ID
router.get("/projects/:projectId", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield projectService.getProjectById(req.params.projectId);
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Add member to project
router.post("/projects/:projectId/members", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { userId, role } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }
        yield projectService.addProjectMember(projectId, String(userId), role);
        res.status(201).json({ message: "Member added successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
// Get project members
router.get("/projects/:projectId/members", auth_1.authenticate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const members = yield projectService.getProjectMembers(projectId);
        res.json(members);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
exports.default = router;
