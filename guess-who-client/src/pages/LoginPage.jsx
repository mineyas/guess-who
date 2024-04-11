import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginPost } from "../api/routes";
import MessageBanner from "../components/MessageBanner";
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
    console.log(data, "login data");
    try {
      const response = await loginPost(data);
      if (response && response.message === "User logged in") {
        sessionStorage.setItem("token", response.token);
        sessionStorage.setItem("email", response.user.email);
        sessionStorage.setItem("firstname", response.user.firstname);
        sessionStorage.setItem("role", response.user.role);
        sessionStorage.setItem("id", response.user._id);

        console.log(response, "response login user");
        console.log(response.user._id, "idid login user user");

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
    <section className="login-container flex items-center justify-center h-screen">
      <div className="container w-1/2 mx-auto">
        <form
          className="container w-4/5 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className=" text-accent4-dark">Welcome Back</h1>
          <div className="form-group">
            <label htmlFor="email" className="w-1/3 text-lg">
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
          {errors.email && (
            <span className="text-red-600">This field is required</span>
          )}
          <div className="form-group">
            <label htmlFor="password" className="w-1/3 text-lg">
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
          {errors.password && (
            <span className="text-red-600">This field is required</span>
          )}
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
          <div className=" text-center">
            <button
              className="button w-fit text-white bg-accent4-dark hover:bg-accent4-light hover:text-accent4-dark font-semibold focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {message && <MessageBanner type={messageType} message={message} />}
    </section>
  );
}
