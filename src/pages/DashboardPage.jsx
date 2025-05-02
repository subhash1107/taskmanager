import React, { useEffect, useState } from "react";
import ProjectList from "../components/project/ProjectList";
import { useDispatch } from "react-redux";
import { fetchProjects } from "../services/ProjectService";
import { setProjects } from "../features/projectSlice";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const projectData = await fetchProjects();
        dispatch(setProjects(projectData));
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [dispatch]);

  return (
    <div className="p-4 space-y-6 relative min-h-screen">
      {loading && <p className="text-blue-500">Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ProjectList />

      <button
        onClick={() => navigate("/create-project")}
        className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all flex items-center justify-center hover:cursor-pointer"
      >
        <Plus size={28} />
      </button>
    </div>
  );
};

export default DashboardPage;
