import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { logoutGet } from "../api/axios";
import { useState } from "react";
import MessageBanner from "../components/MessageBanner";

export default function HomePage() {
  const name = localStorage.getItem("firstname");
  const role  = localStorage.getItem("role");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleLogout = () => {
    try {
      logoutGet();
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("firstname");
      setMessage("Logout successful");
      setMessageType("success");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setMessage("Error logging out");
      setMessageType("error");
    }
  };
  return (
    <>
      {/* <Navbar username={name + " (" + role + ")"} onLogout={handleLogout} /> */}
      <div className="flex flex-col items-center justify-center h-screen bg-accent4-dark">
        <div className="p-8 bg-white rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6 text-primary-dark">
            Welcome to Guess Who!
          </h1>
          <div className="flex flex-col space-y-4 items-center">
            <Link
              to="/game"
              className="button bg-accent2-dark hover:bg-accent2-light hover:text-accent2-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
            >
              Start Game
            </Link>
            <Link
              to="/scores"
              className="button bg-accent3-dark hover:bg-accent3-light hover:text-accent3-dark text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
            >
              See Scores
            </Link>
          </div>
        </div>
        {message && <MessageBanner type={messageType} message={message} />}
      </div>
    </>
  );
}
