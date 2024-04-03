import { NavLink } from "react-router-dom";
import qui from "../assets/img/quii.png";

export default function Navbar({ username, onLogout, role }) {
    
  return (
    <nav className="flex justify-between items-center bg-accent2 p-4">
      {/* <div className="flex flex-col gap-2 items-center"> */}
      {/* <h1 className="uppercase font-bold text-xl">guess</h1> */}
      <span className="w-fit bg-white rounded-full">
        <img src={qui} alt="" className="w-16" />
      </span>
      {/* </div> */}

      <div className="flex gap-3 items-center">
        <span className="text-white font-semibold uppercase text-lg">
          {username} ({role})
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
              //   className="button bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold"
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
              //   className="button bg-accent2-dark hover:bg-accent2-light text-white hover:text-accent2-dark font-semibold"
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
