import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [falling, setFalling] = useState([]); // New state for falling animation

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard