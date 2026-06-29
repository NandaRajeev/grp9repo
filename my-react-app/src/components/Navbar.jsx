import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar({ total }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-icon" aria-hidden="true">📝</div>
      <h1>NoteTracker</h1>
      <div className="header-right">
        {total !== undefined && (
          <span className="header-subtitle">{total} notes</span>
        )}
        {user && (
          <div className="user-info">
            <span className="user-name">Hi, {user.name} 👋</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
