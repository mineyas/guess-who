import { NavLink } from "react-router-dom";
import qui from "../../assets/img/qui.png";
import { getUserById } from "../../api/routes";
import { useEffect, useState } from "react";
// import "./navbar.scss";

export default function Navbar({ username, onLogout, role }) {
  const id = sessionStorage.getItem("id");
  const [currentUser, setCurrentUser] = useState({});
  const [menuBurger, setMenuBurger] = useState(false);
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
  }, [id]);

  const toggleMenu = () => {
    setMenuBurger(!menuBurger);
  };

  return (
    <nav className="navbar">
      <span className="logo">
        <img src={qui} alt="" className="w-16" />
      </span>

      <div className="menu-mobile-container">
        <div className="burger-container">
          <input
            className="checkbox"
            type="checkbox"
            id="menu-checkbox"
            checked={menuBurger}
            onChange={toggleMenu}
          />
          <div className="menu-lines" onClick={toggleMenu}>
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
        </div>
        <span className="username">
          {currentUser.firstname} ({role})
        </span>
      </div>

      {/* <span className="username">
        {currentUser.firstname} ({role})
      </span> */}
      <div className={`menu-items ${menuBurger ? "active" : ""}`}>
        <span className="username">
          {currentUser.firstname} ({role})
        </span>

        {role === "admin" ? (
          <>
            <NavLink to="/admin" className="nav-link">
              Admin
            </NavLink>
            <NavLink to="/admin/characters" className="nav-link">
              Characters
            </NavLink>
            <NavLink to="/admin/users" className="nav-link">
              Users
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              Profile
            </NavLink>
          </>
        )}

        <button onClick={onLogout} className="nav-link logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
}
