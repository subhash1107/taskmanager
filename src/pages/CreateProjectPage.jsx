import React from 'react';
import { useForm } from 'react-hook-form';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateProjectPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post('/projects', { name: data.title });
      toast.success('Project Created Successfully');
      reset();
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create Project</h2>
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-sm font-semibold">Project Title</label>
          <input
            id="title"
            {...register('title', { required: true })}
            placeholder="Enter project title"
            className="p-3 rounded-md border dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
