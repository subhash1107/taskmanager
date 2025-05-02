import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./layouts/Navbar";
import { Toaster } from "react-hot-toast";
import CreateTaskPage from "./pages/CreateTaskPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, logout } from "./features/authSlice";
import axiosInstance from "./utils/axiosInstance";
import CreateProjectPage from "./pages/CreateProjectPage";

function App() {
  const token = localStorage.getItem("token");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axiosInstance.get("/auth/me");
          dispatch(setUser({ name: res.data.name }));
        } catch (error) {
          console.error(error);
          dispatch(logout());
        }
      }
    };

    fetchUser();
  }, [dispatch, token]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard"
          element={token ? <DashboardPage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/create-task" element={<CreateTaskPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
      </Routes>
    </div>
  );
}

export default App;
