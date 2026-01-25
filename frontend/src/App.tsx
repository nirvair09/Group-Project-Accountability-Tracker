import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layout/Applayout";
import Dashboard from "./pages/Dashboard";
import ProjectPage from "./pages/ProjectPage";
import FacultyReport from "./pages/FacultyReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/faculty" element={<FacultyReport />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
