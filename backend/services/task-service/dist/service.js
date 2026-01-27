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
const db_1 = require("../../../shared/db");
const recordEvent_1 = require("../../../shared/events/recordEvent");
const uuid_1 = require("uuid");
function createTask(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskId = (0, uuid_1.v4)();
        yield db_1.pool.query(`
        INSERT INTO tasks
        
        (taskId,projectId,ownerId,title,status,deadline)
        VALUES ($1,$2,$3,$4,'CREATED',$5)`, [taskId, data.projectId, data.ownerId, data.title, data.deadline || null]);
    });
}
function updateTaskStatus(taskId, userId, status) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.pool.query(`SELECT ownerId,projectId ,status FROM tasks where taskId=$1`, [taskId]);
        if (res.rowCount === 0) {
            throw new Error("Task not found");
        }
        const task = res.rows[0];
        if (task.ownerId !== userId) {
            throw new Error("Only the task owner can update the status");
        }
        if (task.status === status) {
            return;
        }
        yield db_1.pool.query(`UPDATE task set status = $1 where taskId=$2`, [
            status,
            taskId,
        ]);
        yield (0, recordEvent_1.recordEvent)({
            project_id: task.project_id,
            user_id: userId,
            type: "TASK_STATUS_CHANGED",
            source: "task-service",
            metadata: { taskId, from: task.status, to: status },
        });
    });
}
function listTask(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield db_1.pool.query(`SELECT * FROM tasks WHERE projectId=$1 ORDER BY createdAt DESC`, [projectId]);
        return res.rows;
    });
}
