import { Route, Routes, useNavigate } from "react-router-dom";
import { logoutGet } from "./api/routes";
import Characters from "./components/Admin/Characters";
import Users from "./components/Admin/Users";
import Navbar from "./components/Navbar";
import Info from "./components/Profile/Info";
import AdminPage from "./pages/AdminPage";
import GamePage from "./pages/GamePage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import ProtectedRoute from "./ReusableComponents/ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const name = sessionStorage.getItem("firstname");
  const role = sessionStorage.getItem("role");
  const email = sessionStorage.getItem("email");

  const isAdmin = () => role === "admin";
  const isLoggedIn = () => !!email;
  const handleLogout = () => {
    try {
      logoutGet();
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("role");
      sessionStorage.removeItem("firstname");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      {isLoggedIn() && (
        <Navbar username={name} role={role} onLogout={handleLogout} />
      )}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn()}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn()}>
              <Info />
            </ProtectedRoute>
          }
        />
        <Route
          path="/game"
          element={
            <ProtectedRoute isAuthenticated={isLoggedIn()}>
              <GamePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute isAuthenticated={isAdmin()}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute isAuthenticated={isAdmin()}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/characters"
          element={
            <ProtectedRoute isAuthenticated={isAdmin()}>
              <Characters />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
