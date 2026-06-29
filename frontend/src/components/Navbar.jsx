import { UserButton, useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

// Returns the best available display name from a Clerk user object.
// Priority: firstName → first word of fullName → username → email prefix
function getGreetingName(user) {
  if (user.firstName)                         return user.firstName;
  if (user.fullName)                          return user.fullName.split(" ")[0];
  if (user.username)                          return user.username;
  if (user.primaryEmailAddress?.emailAddress) return user.primaryEmailAddress.emailAddress.split("@")[0];
  return "there";
}

export default function Navbar({ total }) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(() => navigate("/login"));
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
            <span className="user-name">Hi, {getGreetingName(user)} 👋</span>
            <UserButton
              afterSignOutUrl="/login"
              appearance={{
                variables: {
                  colorPrimary:    "#7c6bff",
                  colorBackground: "#13162a",
                  colorText:       "#eef0ff",
                  borderRadius:    "10px",
                },
                elements: { avatarBox: "clerk-avatar" },
              }}
            />
            <button className="logout-btn" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
