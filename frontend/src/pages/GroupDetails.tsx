import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getTasksByProject, updateTaskStatus, approveTask, createTask, getProjectActivity } from "../api/tasksApi";
import { searchUsers } from "../api/usersApi";
import { addProjectMember, getProjectMembers, getProjectById } from "../api/projectsApi";

type Tab = "TASKS" | "MEMBERS" | "ACTIVITY" | "SCORES";
const TABS: Tab[] = ["TASKS", "MEMBERS", "ACTIVITY", "SCORES"];

export default function GroupDetail() {
  const { groupId } = useParams();
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("TASKS");
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Task creation form
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  
  // Member search
  const [showMemberForm, setShowMemberForm] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Load all data
  useEffect(() => {
    if (!token || !groupId) return;
    setLoading(true);
    Promise.all([
        getProjectById(groupId, token),
        getTasksByProject(groupId, token),
        getProjectMembers(groupId, token),
        getProjectActivity(groupId, token)
    ]).then(([proj, tsk, mem, act]) => {
        setProject(proj);
        setTasks(tsk);
        setMembers(mem);
        setActivity(act);
    })
    .catch(console.error)
    .finally(() => setLoading(false));
  }, [groupId, token]);

  const loadTasks = () => {
    if (!token || !groupId) return;
    getTasksByProject(groupId, token).then(setTasks).catch(console.error);
  };

  const loadMembers = () => {
    if (!token || !groupId) return;
    getProjectMembers(groupId, token).then(setMembers).catch(console.error);
  };

  const loadActivity = () => {
    if (!token || !groupId) return;
    getProjectActivity(groupId, token).then(setActivity).catch(console.error);
  };

  const handleCreateTask = async () => {
    if (!token || !groupId || !newTaskTitle.trim()) return;
    try {
      await createTask(groupId, newTaskTitle, newTaskDeadline, token, newTaskAssignee || undefined);
      setNewTaskTitle("");
      setNewTaskDeadline("");
      setNewTaskAssignee("");
      setShowTaskForm(false);
      loadTasks();
      loadActivity();
    } catch (error) {
      console.error("Failed to create task:", error);
      alert("Failed to create task");
    }
  };

  const handleStatusChange = async (taskId: string, status: "IN_PROGRESS" | "DONE" | "CANCELLED") => {
    if (!token) return;
    try {
      await updateTaskStatus(taskId, status, token);
      loadTasks();
      loadActivity();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleApprove = async (taskId: string) => {
    if (!token) return;
    try {
      await approveTask(taskId, token);
      loadTasks();
      loadActivity();
    } catch (error) {
      console.error("Failed to approve:", error);
    }
  };

  const handleSearchUsers = async () => {
    if (!token || !userSearch.trim()) return;
    try {
      const results = await searchUsers(userSearch, token);
      setSearchResults(results);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  const handleAddMember = async (userId: string) => {
    if (!token || !groupId) return;
    try {
      await addProjectMember(groupId, userId, "MEMBER", token);
      alert("Member added successfully!");
      setSearchResults([]);
      setUserSearch("");
      setShowMemberForm(false);
      loadMembers();
    } catch (error) {
      console.error("Failed to add member:", error);
      alert("Failed to add member");
    }
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading Group Data...</p>;

  // Check if current user is project owner
  const isProjectOwner = project?.ownerid === user?.id;

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      {/* Tabs */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontWeight: activeTab === tab ? "bold" : "normal",
              padding: "10px 20px",
              cursor: "pointer",
              backgroundColor: activeTab === tab ? "#007bff" : "#f8f9fa",
              color: activeTab === tab ? "white" : "black",
              border: "1px solid #dee2e6",
              borderRadius: "5px"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <h1>{project?.name || "Group Details"}</h1>

      {/* TASKS TAB */}
      {activeTab === "TASKS" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Tasks</h2>
            {isProjectOwner && (
                <button 
                onClick={() => setShowTaskForm(!showTaskForm)}
                style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}
                >
                {showTaskForm ? "Cancel" : "+ Create Task"}
                </button>
            )}
          </div>

          {showTaskForm && (
            <div style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#fdfdfd" }}>
              <h3>Create New Task</h3>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Task Title:</label>
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  style={{ padding: "8px", width: "100%", maxWidth: "400px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Deadline:</label>
                <input
                  type="datetime-local"
                  value={newTaskDeadline}
                  onChange={(e) => setNewTaskDeadline(e.target.value)}
                  style={{ padding: "8px", width: "100%", maxWidth: "400px" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Assign to:</label>
                <select 
                    value={newTaskAssignee} 
                    onChange={(e) => setNewTaskAssignee(e.target.value)}
                    style={{ padding: "8px", width: "100%", maxWidth: "400px" }}
                >
                    <option value="">Myself</option>
                    {members.map(m => (
                        <option key={m.userid} value={m.userid}>
                            {m.name} {m.userid === user?.id ? "(Me)" : ""}
                        </option>
                    ))}
                </select>
              </div>
              <button 
                onClick={handleCreateTask}
                style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
              >
                Create Task
              </button>
            </div>
          )}
          
          {tasks.length === 0 && <p style={{ color: "#666", fontStyle: "italic" }}>No tasks created yet.</p>}

          {tasks.map((task) => {
            const isOverdue =
              task.deadline &&
              new Date(task.deadline) < new Date() &&
              task.status !== "APPROVED";

            const assignee = members.find(m => m.userid === task.ownerid);

            return (
              <div key={task.taskid} style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0", borderRadius: "5px", backgroundColor: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{task.title}</strong>
                    <span style={{ 
                        padding: "2px 8px", 
                        borderRadius: "10px", 
                        fontSize: "0.8em",
                        backgroundColor: task.status === 'APPROVED' ? '#d4edda' : '#fff3cd',
                        color: task.status === 'APPROVED' ? '#155724' : '#856404'
                    }}>
                        {task.status}
                    </span>
                </div>
                <div style={{ color: "#666", fontSize: "0.9em" }}>Assigned to: {assignee?.name || "Unknown"}</div>
                
                {task.deadline && (
                  <div style={{ color: isOverdue ? "red" : "#666", fontSize: "0.9em" }}>
                    Deadline: {new Date(task.deadline).toLocaleString()}
                    {isOverdue && <strong> (OVERDUE)</strong>}
                  </div>
                )}

                {/* Action buttons */}
                <div style={{ marginTop: "10px" }}>
                  {task.ownerid === user?.id && task.status === "CREATED" && (
                    <button 
                      onClick={() => handleStatusChange(task.taskid, "IN_PROGRESS")}
                      style={{ marginRight: "5px", padding: "5px 10px", cursor: "pointer" }}
                    >
                      Start Task
                    </button>
                  )}
                  
                  {task.ownerid === user?.id && task.status === "IN_PROGRESS" && (
                    <button 
                      onClick={() => handleStatusChange(task.taskid, "DONE")}
                      style={{ marginRight: "5px", padding: "5px 10px", cursor: "pointer" }}
                    >
                      Mark as Done
                    </button>
                  )}

                  {isProjectOwner && task.status === "DONE" && (
                    <button 
                      onClick={() => handleApprove(task.taskid)}
                      style={{ padding: "5px 15px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
                    >
                      Approve Task
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* MEMBERS TAB */}
      {activeTab === "MEMBERS" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Members</h2>
            {isProjectOwner && (
                <button 
                onClick={() => setShowMemberForm(!showMemberForm)}
                style={{ padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}
                >
                {showMemberForm ? "Cancel" : "+ Add Member"}
                </button>
            )}
          </div>

          {showMemberForm && (
            <div style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#fdfdfd" }}>
              <h3>Add Member to Group</h3>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Search by name or email"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  style={{ padding: "8px", width: "300px", marginRight: "10px" }}
                />
                <button 
                  onClick={handleSearchUsers}
                  style={{ padding: "8px 20px", cursor: "pointer" }}
                >
                  Search
                </button>
              </div>
              
              {searchResults.length > 0 && (
                <div>
                  <h4>Search Results:</h4>
                  {searchResults.map((result) => (
                    <div key={result.id} style={{ padding: "8px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between" }}>
                      <span>{result.name} ({result.email})</span>
                      <button 
                        onClick={() => handleAddMember(result.id)}
                        style={{ padding: "2px 10px", cursor: "pointer" }}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div style={{ marginTop: "20px" }}>
            <h3>Current Members</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                {members.map((member) => (
                <div 
                    key={member.userid} 
                    style={{ 
                    padding: "15px", 
                    border: "1px solid #ddd", 
                    borderRadius: "5px",
                    backgroundColor: "white"
                    }}
                >
                    <div><strong>{member.name}</strong> {member.userid === user?.id ? "(You)" : ""}</div>
                    <div style={{ fontSize: "0.85em", color: "#666" }}>{member.email}</div>
                    <div style={{ marginTop: "5px" }}>
                        <span style={{ 
                            fontSize: "0.75em", 
                            padding: "2px 6px", 
                            backgroundColor: member.role === 'OWNER' ? '#e2e3e5' : '#f8f9fa',
                            borderRadius: "4px"
                        }}>
                            {member.role}
                        </span>
                    </div>
                </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ACTIVITY TAB */}
      {activeTab === "ACTIVITY" && (
        <div>
          <h2>Group Activity</h2>
          {activity.length === 0 ? (
            <p style={{ color: "#666", fontStyle: "italic" }}>No activity recorded yet.</p>
          ) : (
            <div style={{ borderLeft: "2px solid #007bff", paddingLeft: "20px" }}>
              {activity.map((event) => (
                <div key={event.event_id} style={{ marginBottom: "20px", position: "relative" }}>
                   <div style={{ 
                       position: "absolute", 
                       left: "-26px", 
                       top: "5px", 
                       width: "10px", 
                       height: "10px", 
                       borderRadius: "50%", 
                       backgroundColor: "#007bff" 
                   }}></div>
                   <div style={{ fontSize: "0.9em", color: "#333" }}>
                       <strong>{event.username || "System"}</strong> 
                       {event.type === 'TASK_CREATED' && ` created task: ${event.metadata?.title}`}
                       {event.type === 'TASK_STATUS_CHANGED' && ` changed task status to ${event.metadata?.to}`}
                       {event.type === 'TASK_APPROVED' && ` approved a task.`}
                   </div>
                   <div style={{ fontSize: "0.75em", color: "#999" }}>
                       {new Date(event.timestamp).toLocaleString()}
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SCORES TAB */}
      {activeTab === "SCORES" && (
        <div>
          <h2>Accountability Scores</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
              {members.map(member => {
                  const memberTasks = tasks.filter(t => t.ownerid === member.userid);
                  const approvedTasks = memberTasks.filter(t => t.status === 'APPROVED');
                  const score = memberTasks.length > 0 
                    ? Math.round((approvedTasks.length / memberTasks.length) * 100) 
                    : 0;

                  return (
                      <div key={member.userid} style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "white" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div>
                                  <h3 style={{ margin: "0 0 5px 0" }}>{member.name}</h3>
                                  <div style={{ color: "#666", fontSize: "0.9em" }}>
                                      {approvedTasks.length} / {memberTasks.length} tasks approved
                                  </div>
                              </div>
                              <div style={{ textAlign: "right" }}>
                                  <div style={{ fontSize: "2em", fontWeight: "bold", color: score >= 70 ? "#28a745" : score >= 40 ? "#ffc107" : "#dc3545" }}>
                                      {score}%
                                  </div>
                                  <div style={{ fontSize: "0.8em", color: "#999" }}>Score</div>
                              </div>
                          </div>
                          <div style={{ height: "8px", backgroundColor: "#f0f0f0", borderRadius: "4px", marginTop: "15px", overflow: "hidden" }}>
                              <div style={{ 
                                  height: "100%", 
                                  width: `${score}%`, 
                                  backgroundColor: score >= 70 ? "#28a745" : score >= 40 ? "#ffc107" : "#dc3545",
                                  transition: "width 0.5s ease-in-out"
                              }}></div>
                          </div>
                      </div>
                  );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
