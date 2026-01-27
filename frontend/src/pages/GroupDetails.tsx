import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { getTasksByProject, updateTaskStatus, approveTask, createTask } from "../api/tasksApi";
import { searchUsers } from "../api/usersApi";
import { addProjectMember } from "../api/projectsApi";

type Tab = "TASKS" | "MEMBERS" | "ACTIVITY";
const TABS: Tab[] = ["TASKS", "MEMBERS", "ACTIVITY"];

export default function GroupDetail() {
  const { groupId } = useParams();
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("TASKS");
  const [tasks, setTasks] = useState<any[]>([]);
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

  // Load tasks
  useEffect(() => {
    if (!token || !groupId) return;
    loadTasks();
  }, [groupId, token]);

  const loadTasks = () => {
    if (!token || !groupId) return;
    getTasksByProject(groupId, token)
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleCreateTask = async () => {
    if (!token || !groupId || !newTaskTitle.trim()) return;
    
    try {
      await createTask(groupId, newTaskTitle, newTaskDeadline, token);
      setNewTaskTitle("");
      setNewTaskDeadline("");
      setShowTaskForm(false);
      loadTasks();
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
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleApprove = async (taskId: string) => {
    if (!token) return;
    try {
      await approveTask(taskId, token);
      loadTasks();
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
    } catch (error) {
      console.error("Failed to add member:", error);
      alert("Failed to add member");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontWeight: activeTab === tab ? "bold" : "normal",
              margin: "5px",
              padding: "10px 20px",
              cursor: "pointer"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <h1>Group Details</h1>

      {/* TASKS TAB */}
      {activeTab === "TASKS" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Tasks</h2>
            <button 
              onClick={() => setShowTaskForm(!showTaskForm)}
              style={{ padding: "10px 20px", cursor: "pointer" }}
            >
              {showTaskForm ? "Cancel" : "+ Create Task"}
            </button>
          </div>

          {showTaskForm && (
            <div style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <h3>Create New Task</h3>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="text"
                  placeholder="Task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  style={{ padding: "8px", width: "300px", marginRight: "10px" }}
                />
              </div>
              <div style={{ marginBottom: "10px" }}>
                <input
                  type="datetime-local"
                  value={newTaskDeadline}
                  onChange={(e) => setNewTaskDeadline(e.target.value)}
                  style={{ padding: "8px", marginRight: "10px" }}
                />
              </div>
              <button 
                onClick={handleCreateTask}
                style={{ padding: "8px 20px", cursor: "pointer" }}
              >
                Create Task
              </button>
            </div>
          )}
          
          {tasks.length === 0 && <p>No tasks yet</p>}

          {tasks.map((task) => {
            const isOverdue =
              task.deadline &&
              new Date(task.deadline) < new Date() &&
              task.status !== "APPROVED";

            return (
              <div key={task.taskid} style={{ border: "1px solid #ccc", padding: "15px", margin: "10px 0", borderRadius: "5px" }}>
                <strong>{task.title}</strong>
                <div>Status: {task.status}</div>
                <div>Owner: {task.ownerid}</div>
                
                {task.deadline && (
                  <div>
                    Deadline: {new Date(task.deadline).toLocaleDateString()}
                    {isOverdue && <span style={{ color: "red" }}> (OVERDUE)</span>}
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

                  {task.status === "DONE" && (
                    <button 
                      onClick={() => handleApprove(task.taskid)}
                      style={{ padding: "5px 10px", cursor: "pointer", backgroundColor: "#4CAF50", color: "white" }}
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
            <button 
              onClick={() => setShowMemberForm(!showMemberForm)}
              style={{ padding: "10px 20px", cursor: "pointer" }}
            >
              {showMemberForm ? "Cancel" : "+ Add Member"}
            </button>
          </div>

          {showMemberForm && (
            <div style={{ margin: "20px 0", padding: "15px", border: "1px solid #ccc", borderRadius: "5px" }}>
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
                    <div key={result.id} style={{ padding: "8px", borderBottom: "1px solid #eee" }}>
                      <span>{result.name} ({result.email})</span>
                      <button 
                        onClick={() => handleAddMember(result.id)}
                        style={{ marginLeft: "10px", padding: "5px 10px", cursor: "pointer" }}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <p>Member management implemented. Members can be added using the search above.</p>
        </div>
      )}

      {/* ACTIVITY TAB */}
      {activeTab === "ACTIVITY" && (
        <div>
          <h2>Activity</h2>
          <p>Activity log coming soon...</p>
        </div>
      )}
    </div>
  );
}
