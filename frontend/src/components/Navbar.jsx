// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
import { useUser, useClerk } from "@clerk/clerk-react";

export default function Navbar({ total }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    await signOut();
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
            <span className="user-name">Hi, {user.fullName} 👋</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
