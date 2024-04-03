import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import MessageBanner from "../components/MessageBanner";
import { loginPost } from "../api/axios";
export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const onSubmit = async (data) => {
    try {
      const response = await loginPost(data);
      if (response && response.message === "User logged in") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("email", response.user.email);
        localStorage.setItem("firstname", response.user.firstname);
        localStorage.setItem("role", response.user.role);

        setMessage("Login successful");
        setMessageType("success");
        if (response.user.role === "admin") {
          navigate("/admin");
        } else if (response.user.role === "player") {
          navigate("/");
        }
      } else if (response && response.status === 401) {
        setMessage("Invalid username or password");
        setMessageType("error");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setMessage("Error logging in");
      setMessageType("error");
    }
  };
  return (
    <div className="login-container flex items-center justify-center h-screen">
      <form
        className="container mx-auto p-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className=" text-accent4-dark">
          Welcome Back
        </h1>
        <div className="form-group">
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            {...register("email", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            {...register("password", { required: true })}
          />
        </div>
        <div className="form-group">
          <Link
            to="/forgot"
            className="text-accent4-dark font-normal hover:underline"
          >
            Forgot Password?
          </Link>
        </div>
        <p className="text-sm text-center my-3">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-accent4-dark font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <div className="form-group text-center">
          <button
            className="button w-fit text-white bg-accent4-dark hover:bg-accent4-light hover:text-accent4-dark font-semibold focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      {message && <MessageBanner type={messageType} message={message} />}
    </div>
  );
}
