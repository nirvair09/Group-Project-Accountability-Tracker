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
exports.createProject = createProject;
exports.getUserProjects = getUserProjects;
exports.getProjectById = getProjectById;
exports.addProjectMember = addProjectMember;
const db_1 = require("../../../shared/db");
const uuid_1 = require("uuid");
function createProject(name, ownerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectId = (0, uuid_1.v4)();
        yield db_1.pool.query(`INSERT INTO projects (projectId, name, ownerId, createdAt) 
     VALUES ($1, $2, $3, NOW())`, [projectId, name, ownerId]);
        // Add owner as a member
        yield db_1.pool.query(`INSERT INTO project_members (projectId, userId, role, joinedAt) 
     VALUES ($1, $2, 'OWNER', NOW())`, [projectId, ownerId]);
        return { projectId, name, ownerId };
    });
}
function getUserProjects(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.pool.query(`SELECT p.projectId, p.name, p.ownerId, p.createdAt, pm.role
     FROM projects p
     INNER JOIN project_members pm ON p.projectId = pm.projectId
     WHERE pm.userId = $1
     ORDER BY p.createdAt DESC`, [userId]);
        return result.rows;
    });
}
function getProjectById(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield db_1.pool.query(`SELECT * FROM projects WHERE projectId = $1`, [projectId]);
        if (result.rows.length === 0) {
            throw new Error("Project not found");
        }
        return result.rows[0];
    });
}
function addProjectMember(projectId_1, userId_1) {
    return __awaiter(this, arguments, void 0, function* (projectId, userId, role = "MEMBER") {
        yield db_1.pool.query(`INSERT INTO project_members (projectId, userId, role, joinedAt) 
     VALUES ($1, $2, $3, NOW())
     ON CONFLICT (projectId, userId) DO NOTHING`, [projectId, userId, role]);
    });
}
