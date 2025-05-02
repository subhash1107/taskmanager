import axiosInstance from '../utils/axiosInstance';

export const fetchProjects = async () => {
  try {
    const response = await axiosInstance.get('/projects');
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; 
  }
};
