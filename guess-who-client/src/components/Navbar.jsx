import { NavLink } from "react-router-dom";
import qui from "../assets/img/quii.png";
import { getUserById } from "../api/routes";
import { useEffect, useState } from "react";

export default function Navbar({ username, onLogout, role }) {
  const id = sessionStorage.getItem("id");
  const [currentUser, setCurrentUser] = useState({});
  const getUserInfo = async () => {
    try {
      const response = await getUserById(id);
      const info = response.user;
      setCurrentUser(info);
      console.log(info, "response");
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  });
  return (
    <nav className="flex justify-between items-center bg-accent2 p-4">
      <span className="w-fit bg-white rounded-full">
        <img src={qui} alt="" className="w-16" />
      </span>
      <div className="flex gap-3 items-center">
        <span className="text-white font-semibold uppercase text-lg">
          {currentUser.firstname} ({role})
        </span>

        {role === "admin" ? (
          <>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive
                  ? "active button"
                  : "button bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold"
              }
            >
              Admin
            </NavLink>
            <NavLink
              to="/admin/characters"
              className={({ isActive }) =>
                isActive
                  ? "active button"
                  : "button bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold"
              }
            >
              Characters
            </NavLink>

            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                isActive
                  ? "active button"
                  : "button bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold"
              }
            >
              Users
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "active button"
                  : "button bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "active button"
                  : "button bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold"
              }
            >
              Profile
            </NavLink>
          </>
        )}

        <button
          onClick={onLogout}
          className="button bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
