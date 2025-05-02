import React, { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Plus, Pencil, Trash, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance.js";
import toast from "react-hot-toast";

const ProjectList = () => {
  const { projects } = useSelector((state) => state.project);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", status: "Pending" });
  const navigate = useNavigate();

  const handleProjectClick = useCallback((projectId) => {
    setSelectedProjectId((prevId) => (prevId === projectId ? null : projectId));
    setEditingTaskId(null);
  }, []);

  const handleCreateTask = useCallback(() => {
    if (!selectedProjectId) {
      alert("Please select a project first!");
      return;
    }
    navigate(`/create-task`);
  }, [navigate, selectedProjectId]);

  const handleDeleteTask = async (taskId) => {
    if (!selectedProjectId) return;

    try {
      await axiosInstance.delete(
        `/projects/${selectedProjectId}/tasks/${taskId}`
      );
      window.location.reload()
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete task.");
    }
  };

  const handleEditTaskClick = (task) => {
    setEditingTaskId(task._id);
    setEditForm({ title: task.title, status: task.status });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = async (taskId) => {
    if (!selectedProjectId) return;

    try {
      await axiosInstance.put(
        `/projects/${selectedProjectId}/tasks/${taskId}`,
        editForm
      );
      window.location.reload()
      toast.success("Task updated successfully!");
      setEditingTaskId(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update task.");
    }
  };

  const selectedProject = useMemo(
    () => projects.find((project) => project._id === selectedProjectId),
    [projects, selectedProjectId]
  );

  return (
    <div className="relative">
      <h2 className="text-xl font-bold mb-4">Your Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects && projects.length == 0 ? <>No Project to show</> : ""}
        {projects.map((project) => (
          <div
            key={project._id}
            className={`p-4 rounded shadow cursor-pointer transition 
              ${
                selectedProjectId === project._id
                  ? "bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500"
                  : "bg-white dark:bg-gray-800"
              }`}
            onClick={() => handleProjectClick(project._id)}
          >
            <h3 className="font-semibold">{project.name}</h3>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded shadow space-y-4">
          <h3 className="text-lg font-semibold">
            Tasks for "{selectedProject.name}"
          </h3>

          {selectedProject.tasks.length === 0 ? (
            <p className="text-gray-500">No tasks to show.</p>
          ) : (
            <ul className="space-y-3">
              {selectedProject.tasks.map((task) => (
                <li
                  key={task._id}
                  className="flex flex-col gap-2 bg-gray-100 dark:bg-gray-700 p-3 rounded"
                >
                  {editingTaskId === task._id ? (
                    <>
                      <input
                        type="text"
                        name="title"
                        value={editForm.title}
                        onChange={handleEditFormChange}
                        className="p-2 rounded border dark:border-gray-600 bg-white dark:bg-gray-600 w-full"
                        autoFocus
                      />
                      <div className="flex gap-4">
                        {["Pending", "In Progress", "Completed"].map(
                          (status) => (
                            <label
                              key={status}
                              className="flex items-center gap-1"
                            >
                              <input
                                type="radio"
                                name="status"
                                value={status}
                                checked={editForm.status === status}
                                onChange={handleEditFormChange}
                              />
                              {status}
                            </label>
                          )
                        )}
                      </div>
                      <button
                        onClick={() => handleSubmitEdit(task._id)}
                        className="self-end flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                      >
                        <Check size={16} /> Save
                      </button>
                    </>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.status}</p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditTaskClick(task)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleCreateTask}
            className=" p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition hover:cursor-pointer"
          >
            <Plus size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
