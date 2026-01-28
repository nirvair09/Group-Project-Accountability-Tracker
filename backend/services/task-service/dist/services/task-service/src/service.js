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
exports.createTask = createTask;
exports.updateTaskStatus = updateTaskStatus;
exports.listTask = listTask;
exports.listUserTasks = listUserTasks;
exports.approveTask = approveTask;
exports.getProjectActivity = getProjectActivity;
exports.getAllUserActivity = getAllUserActivity;
const shared_1 = require("@gpa/shared");
const uuid_1 = require("uuid");
function createTask(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskId = (0, uuid_1.v4)();
        yield shared_1.pool.query(`
        INSERT INTO tasks
        
        (taskId,projectId,ownerId,title,status,deadline)
        VALUES ($1,$2,$3,$4,'CREATED',$5)`, [taskId, data.projectId, data.ownerId, data.title, data.deadline ? data.deadline : null]);
        yield (0, shared_1.recordEvent)({
            project_id: data.projectId,
            user_id: data.ownerId,
            type: "TASK_CREATED",
            source: "task-service",
            metadata: { taskId, title: data.title },
        });
    });
}
function updateTaskStatus(taskId, userId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.pool.query(`SELECT ownerId, projectId, status, title FROM tasks WHERE taskId=$1`, [taskId]);
        if (res.rowCount === 0) {
            throw new Error("Task not found");
        }
        const task = res.rows[0];
        if (task.ownerid !== userId) {
            throw new Error("Only the task owner can update the status");
        }
        if (task.status === status) {
            return;
        }
        yield shared_1.pool.query(`UPDATE tasks SET status = $1 WHERE taskId=$2`, [
            status,
            taskId,
        ]);
        yield (0, shared_1.recordEvent)({
            project_id: task.projectid,
            user_id: userId,
            type: "TASK_STATUS_CHANGED",
            source: "task-service",
            metadata: {
                taskId,
                from: task.status,
                to: status,
                taskTitle: task.title // Added title for better logs
            },
        });
    });
}
function listTask(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.pool.query(`SELECT * FROM tasks WHERE projectId=$1 ORDER BY createdAt DESC`, [projectId]);
        return res.rows;
    });
}
function listUserTasks(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.pool.query(`SELECT t.*, p.name as projectName, p.ownerId as projectOwnerId
     FROM tasks t
     JOIN projects p ON t.projectId = p.projectId
     WHERE t.ownerId=$1 
     ORDER BY t.createdAt DESC`, [userId]);
        return res.rows;
    });
}
function approveTask(taskId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.pool.query(`SELECT projectId, status, title FROM tasks WHERE taskId=$1`, [taskId]);
        if (res.rowCount === 0) {
            throw new Error("Task not found");
        }
        const task = res.rows[0];
        yield shared_1.pool.query(`UPDATE tasks SET status = 'APPROVED' WHERE taskId=$1`, [
            taskId,
        ]);
        yield (0, shared_1.recordEvent)({
            project_id: task.projectid,
            user_id: userId,
            type: "TASK_APPROVED",
            source: "task-service",
            metadata: { taskId, taskTitle: task.title },
        });
    });
}
function getProjectActivity(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.pool.query(`SELECT e.*, u.name as userName 
     FROM evidence_events e
     LEFT JOIN users u ON e.user_id = u.id
     WHERE e.project_id = $1
     ORDER BY e.timestamp DESC`, [projectId]);
        return res.rows;
    });
}
function getAllUserActivity(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.pool.query(`SELECT e.*, u.name as userName, p.name as projectName
     FROM evidence_events e
     LEFT JOIN users u ON e.user_id = u.id
     JOIN projects p ON e.project_id = p.projectId
     JOIN project_members pm ON p.projectId = pm.projectId
     WHERE pm.userId = $1
     ORDER BY e.timestamp DESC
     LIMIT 50`, [userId]);
        return res.rows;
    });
}
