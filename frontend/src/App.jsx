import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import ProtectedRoute from "./components/ProtectedRoute";
// import Login     from "./pages/Login";
// import Register  from "./pages/Register";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route
  path="/login/*"
  element={
    <div className="auth-wrapper">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/register"
        forceRedirectUrl="/"
      />
    </div>
  }
/>

<Route
  path="/register/*"
  element={
    <div className="auth-wrapper">
      <SignUp
        routing="path"
        path="/register"
        signInUrl="/login"
        forceRedirectUrl="/"
      />
    </div>
  }
/>

      <Route
        path="/"
        element={
          <>
            <SignedOut>
              <Navigate to="/login" replace />
            </SignedOut>

            <SignedIn>
              <Dashboard />
            </SignedIn>
          </>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
}
