// import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
  redirect,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import { logoutGet } from "./api/axios";
import Users from "./components/Admin/Users";
import Characters from "./components/Admin/Characters";
// import './assets/global.css'

function App() {
  const navigate = useNavigate();
  const name = localStorage.getItem("firstname");
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const isAdmin = () => role === "admin";

  const isLoggedIn = () => {
    if (email) {
      return true;
    }
  };
  const handleLogout = () => {
    try {
      logoutGet();
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("firstname");
      // setMessage("Logout successful");
      // setMessageType("success");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      // setMessage("Error logging out");
      // setMessageType("error");
    }
  };
  return (
    <>
      {isLoggedIn() && (
        <Navbar username={name} role={role} onLogout={handleLogout} />
      )}
      {/* <div> */}
      <Routes>
        <Route
          exact
          path="/"
          element={isLoggedIn() ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/admin"
          element={isAdmin() ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/users"
          element={isAdmin() ? <Users /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/characters"
          element={isAdmin() ? <Characters /> : <Navigate to="/login" />}
        />
        {/* <Route
          path="/admin/users"
          element={isAdmin() ? <AdminUsers /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/characters"
          element={isAdmin() ? <AdminCharacters /> : <Navigate to="/login" />}
        /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* </div> */}
    </>
  );
}

export default App;
