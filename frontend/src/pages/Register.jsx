import { SignUp } from "@clerk/clerk-react";

// Replaces the custom registration form.
// Clerk's <SignUp /> handles: email, password, verification email, OAuth.
// After sign-up, Clerk redirects to "/" automatically.
export default function RegisterPage() {
  return (
    <div className="auth-page">
      <div className="auth-clerk-wrap">
        <SignUp
          routing="path"
          path="/register"
          signInUrl="/login"
          fallbackRedirectUrl="/"
          appearance={{
            variables: {
              colorPrimary:        "#7c6bff",
              colorBackground:     "#13162a",
              colorInputBackground:"#1a1e35",
              colorInputText:      "#eef0ff",
              colorText:           "#c7cde8",
              colorTextSecondary:  "#6b7299",
              borderRadius:        "10px",
              fontFamily:          "'Inter', system-ui, sans-serif",
            },
            elements: {
              card:              "auth-clerk-card",
              headerTitle:       "auth-clerk-title",
              formButtonPrimary: "btn btn-primary btn-full",
              footerActionLink:  "auth-clerk-link",
            },
          }}
        />
      </div>
    </div>
  );
}
