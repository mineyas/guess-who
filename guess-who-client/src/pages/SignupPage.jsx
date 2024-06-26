import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { signupPost } from "../api/routes";
import img from "../assets/img/patt.png";
import MessageBanner from "../components/MessageBanner";
export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    try {
      signupPost(data)
        .then((response) => {
          setMessage("Signup successful!");
          setMessageType("success");
          navigate("/login");
        })
        .catch((error) => {
          setMessage("Error registering user");
          setMessageType("error");
          console.error("Error registering user:", error.message);
        });
    } catch (error) {
      setMessage("Error registering user");
      setMessageType("error");
    }
  };
  const validatePassword = (value) => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      regex.test(value) ||
      "Password must contain at least one special character"
    );
  };

  const checkEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value) || "Invalid email address";
  }

  return (
    <section className="flex items-center">
      <div className="w-1/2">
        <img className="h-screen object-cover w-full" src={img} alt="pattern" />
      </div>
      <div className="h-fit w-1/2 ">
        <form
          className="container w-4/5 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-bold mb-6 text-primary-dark">
            Create an Account
          </h1>
          <div className="form-group">
            <label htmlFor="firstname" className="w-1/3 text-lg">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className="input-field"
              {...register("firstname", { required: true })}
            />
          </div>
          {errors.firstname && (
            <span className="text-red-600">This field is required</span>
          )}
          <div className="form-group">
            <label htmlFor="lastname" className="w-1/3 text-lg">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              className="input-field"
              {...register("lastname", { required: true })}
            />
          </div>
          {errors.lastname && (
            <span className="text-red-600">This field is required</span>
          )}
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
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 100,
                validate: validatePassword,
              })}
            />
          </div>
          <span className="flex_col text-red-500">
            {errors.password?.type === "required" && <p>This field is required</p>}
            {errors.password?.type === "minLength" && (
              <p>Password must be at least 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p>Password must be at most 100 characters</p>
            )}
            {errors.password?.type === "validate" ? (
              <p>Password must contain at least one special character</p>
            ) : (
              errors.password?.message
            )}
          </span>
          <p className="text-sm text-center my-3">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-dark font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
          <div className=" text-center">
            <button
              className="button w-fit bg-primary-dark hover:bg-primary-light text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
      {message && <MessageBanner type={messageType} message={message} />}
    </section>
  );
}
