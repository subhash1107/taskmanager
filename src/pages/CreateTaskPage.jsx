import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance";

const CreateTaskPage = () => {
  const { projects } = useSelector((state) => state.project);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (!data.projectId) {
        toast.error("Please select a project.");
        return;
      }
      await axiosInstance.post(`/projects/${data.projectId}/tasks`, {
        title: data.title,
        status: data.status,
      });
      toast.success("Task created successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projects.length === 0) {
      toast.error("No projects available. Please create a project first.");
      navigate("/");
    }
  }, [projects, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create New Task</h2>

        <div className="flex flex-col">
          <label className="mb-1">Select Project</label>
          <select
            {...register("projectId")}
            className="p-2 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
          >
            <option value="">-- Select Project --</option>
            {projects.map((project) => (
              <option key={project._id} value={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Task Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="p-2 rounded border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
            placeholder="Enter task title"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1">Status</label>
          <div className="flex gap-4">
            <div>
              <label>
                <input
                  type="radio"
                  value="Pending"
                  {...register("status")}
                  defaultChecked
                />
                Pending
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="In Progress"
                  {...register("status")}
                />
                In Progress
              </label>
            </div>
            <div>
              <label>
                <input type="radio" value="Completed" {...register("status")} />
                Completed
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default CreateTaskPage;
