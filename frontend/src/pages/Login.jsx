import { SignIn } from "@clerk/clerk-react";

// Replaces the custom email/password login form.
// Clerk's <SignIn /> handles: email, password, OAuth, MFA, error states.
// After sign-in, Clerk redirects to "/" automatically.
export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-clerk-wrap">
        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/register"
          fallbackRedirectUrl="/"
          appearance={{
            variables: {
              colorPrimary:       "#7c6bff",
              colorBackground:    "#13162a",
              colorInputBackground:"#1a1e35",
              colorInputText:     "#eef0ff",
              colorText:          "#c7cde8",
              colorTextSecondary: "#6b7299",
              borderRadius:       "10px",
              fontFamily:         "'Inter', system-ui, sans-serif",
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
