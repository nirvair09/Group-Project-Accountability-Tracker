import type { Task, EvidenceEvent } from "../types";
import { users } from "../data/users";
import { CURRENT_USER_ID } from "../constants/currentUser";

type Props = {
  task: Task;
  onClose: () => void;
  activity: EvidenceEvent[];
};

export default function TaskDetail({ task, onClose, activity }: Props) {
  const owner = users.find((u) => u.id === task.ownerId);

  // TEMP leader logic (hardcoded for now)
  const isLeader = CURRENT_USER_ID === "u1";

  const canApprove = isLeader && task.status === "AWAITING_APPROVAL";

  return (
    <div>
      <hr />

      <h2>Task Detail</h2>

      <p>
        <strong>Title:</strong> {task.title}
      </p>

      <p>
        <strong>Owner:</strong> {owner?.name}
      </p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      {task.deadline && (
        <p>
          <strong>Deadline:</strong>{" "}
          {new Date(task.deadline).toLocaleDateString()}
        </p>
      )}

      {/* Approval */}
      {canApprove && <button>Approve Task</button>}

      {/* Activity */}
      <h3>Activity</h3>

      {activity.length === 0 && <p>No activity yet.</p>}

      {activity.map((event) => (
        <div key={event.id}>
          <div>
            {event.type} — {new Date(event.timestamp).toLocaleString()}
          </div>
        </div>
      ))}

      <button onClick={onClose}>Close</button>

      <hr />
    </div>
  );
}
