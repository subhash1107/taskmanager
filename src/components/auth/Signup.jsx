import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/yupSchemas";
import { registerUser } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      toast.success("Signup Successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Signup Failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-md shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      <div className="flex flex-col gap-1">
        <label>Name</label>
        <input
          {...register("name")}
          type="text"
          className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Email</label>
        <input
          {...register("email")}
          type="email"
          className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Password</label>
        <input
          {...register("password")}
          type="password"
          className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>Country</label>
        <input
          {...register("country")}
          type="text"
          className="p-2 rounded-md border dark:border-gray-700 bg-gray-50 dark:bg-gray-700"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
      >
        Signup
      </button>
      <p
        className="text-center hover:cursor-pointer text-blue-400"
        onClick={() => navigate("/login")}
      >
        Already Registered? Sign In
      </p>
    </form>
  );
};

export default Signup;
