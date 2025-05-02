import axiosInstance from '../utils/axiosInstance';

export const loginUser = (data) => axiosInstance.post('/auth/login', data);
export const registerUserService = (data) => axiosInstance.post('/auth/signup', data);
