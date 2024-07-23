import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [todos, setTodos] = useState(() => {
    // Load todos from local storage or return an empty array
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [falling, setFalling] = useState([]); // New state for falling animation

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    if (input.trim()) {
      const newTodos = [...todos, { text: input, completed: false }];
      setTodos(newTodos);
      setInput("");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}

export default Dashboard