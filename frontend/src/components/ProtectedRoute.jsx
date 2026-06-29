import { useAuth } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

// Uses Clerk's useAuth() instead of the old AuthContext.
// isLoaded: false while Clerk is initialising (prevents flash of login page)
// isSignedIn: true when there's an active Clerk session
export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="auth-loading">
        <div className="spinner" />
      </div>
    );
  }

  return isSignedIn ? children : <Navigate to="/login" replace />;
}
