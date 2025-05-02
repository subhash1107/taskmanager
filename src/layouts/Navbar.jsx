import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 dark:bg-gray-800 text-white">
      <div className="text-xl font-bold">Task Manager</div>

      {user && (
        <div className="flex items-center gap-4">
          <p className="text-sm">
            Welcome, <span className="font-semibold">{user.name}</span>
          </p>
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded dark:bg-red-600 dark:hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
