import { useParams } from "react-router-dom";
import { useState } from "react";

import { tasks } from "../data/tasks";
import { users } from "../data/users";
import { projects } from "../data/projects";
import { projectMembers } from "../data/projectMembers";

import type { TaskStatus } from "../types";

/* -----------------------------
   Constants
----------------------------- */

const STATUS_ORDER: TaskStatus[] = [
  "TODO",
  "IN_PROGRESS",
  "COMPLETED",
  "AWAITING_APPROVAL",
  "APPROVED",
];

type Tab = "TASKS" | "MEMBERS";
const TABS: Tab[] = ["TASKS", "MEMBERS"];

/* -----------------------------
   Component
----------------------------- */

export default function GroupDetail() {
  const { groupId } = useParams();

  // Hooks MUST be at the top
  const [activeTab, setActiveTab] = useState<Tab>("TASKS");

  const project = projects.find((p) => p.id === groupId);
  const groupTasks = tasks.filter((t) => t.projectId === groupId);

  if (!project) {
    return <p>Group not found.</p>;
  }

  return (
    <div>
      {/* Tabs */}
      <div>
        {TABS.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      <h1>{project.name}</h1>

      {/* =====================
          TASKS TAB
         ===================== */}
      {activeTab === "TASKS" && (
        <>
          <h2>Tasks</h2>

          {STATUS_ORDER.map((status) => {
            const tasksByStatus = groupTasks.filter((t) => t.status === status);

            if (tasksByStatus.length === 0) return null;

            return (
              <div key={status}>
                <h3>{status.replace("_", " ")}</h3>

                {tasksByStatus.map((task) => {
                  const owner = users.find((u) => u.id === task.ownerId);

                  const isOverdue =
                    task.deadline &&
                    new Date(task.deadline) < new Date() &&
                    task.status !== "APPROVED";

                  return (
                    <div key={task.id}>
                      <strong>{task.title}</strong>
                      <div>Owner: {owner?.name}</div>

                      {task.deadline && (
                        <div>
                          Deadline:{" "}
                          {new Date(task.deadline).toLocaleDateString()}
                          {isOverdue && " (OVERDUE)"}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </>
      )}

      {/* =====================
          MEMBERS TAB
         ===================== */}
      {activeTab === "MEMBERS" && (
        <div>
          <h2>Members</h2>

          {projectMembers
            .filter((m) => m.projectId === groupId)
            .map((member) => {
              const user = users.find((u) => u.id === member.userId);

              const memberTasks = groupTasks.filter(
                (t) => t.ownerId === member.userId,
              );

              const completed = memberTasks.filter(
                (t) => t.status === "APPROVED",
              ).length;

              const overdue = memberTasks.filter(
                (t) =>
                  t.deadline &&
                  new Date(t.deadline) < new Date() &&
                  t.status !== "APPROVED",
              ).length;

              const pending = memberTasks.filter(
                (t) => t.status !== "APPROVED",
              ).length;

              return (
                <div key={member.userId}>
                  <strong>{user?.name}</strong>
                  <div>Role: {member.role}</div>
                  <div>Assigned Tasks: {memberTasks.length}</div>
                  <div>Completed Tasks: {completed}</div>
                  <div>Pending Tasks: {pending}</div>
                  <div>Overdue Tasks: {overdue}</div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
