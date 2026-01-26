import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import MyGroups from "./pages/MyGroups";
import Activity from "./pages/Activity";
import Scores from "./pages/Scores";
import GroupDetails from "./pages/GroupDetails";

function App() {
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
