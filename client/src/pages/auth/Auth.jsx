import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="sign-in-container">
      <SignedOut>
        <div className="container">
          <h1>
            <span className="heading">To-Do List Manager!</span>
          </h1>
          <p>Stay organized and boost your productivity with our intuitive To-Do List Manager. Easily add, edit, and track your tasks to ensure you never miss a deadline again. </p>
          <SignUpButton mode="modal" />
          <SignInButton mode="modal" />
        </div>
      </SignedOut>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
    </div>
  );
};

export default Auth;
