import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import { useAuth } from "./auth/AuthContext";

import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import MyGroups from "./pages/MyGroups";
import Activity from "./pages/Activity";
import Scores from "./pages/Scores";
import GroupDetails from "./pages/GroupDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const { token } = useAuth();

  // Redirect to login if not authenticated
  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<MyTasks />} />
          <Route path="/groups" element={<MyGroups />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/scores" element={<Scores />} />
          <Route path="/groups/:groupId" element={<GroupDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
