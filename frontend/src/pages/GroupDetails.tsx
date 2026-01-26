import { useParams } from "react-router-dom";

export default function GroupDetails() {
  const { groupId } = useParams();

  return (
    <div>
      <h1>Group Details for Group ID: {groupId}</h1>
    </div>
  );
}
