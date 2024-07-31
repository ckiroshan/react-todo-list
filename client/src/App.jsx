import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import Dashboard from "./pages/dashboard/Dashboard";
import Auth from "./pages/auth/Auth";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  const { user } = useUser();
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <div className="logo">
            <Link to="/">Todo Tracker</Link>
          </div>
          <div className="navbar-center">
            <SignedIn>
              <Link to="/dashboard">Tasks Insight</Link>
            </SignedIn>
          </div>
          <div className="navbar-right">
            <SignedIn>
              <div className="navbar-greeting">
                Hi, <span className="heading-username">{user?.firstName}!</span>
              </div>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <TodoProvider>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Auth />} />
          </Routes>
        </TodoProvider>
      </div>
    </Router>
  );
}

export default App;
