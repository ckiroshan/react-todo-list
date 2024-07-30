import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const { user } = useUser();

  const fetchTodos = async () => {
    if (!user) return;

    const response = await fetch(`http://localhost:8080/api/todos?userId=${user.id}`);

    if (response.ok) {
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [user]);

  const addTodo = async (todo) => {
    const response = await fetch("http://localhost:8080/api/todos", {

      method: "POST",
      body: JSON.stringify({ ...todo, userId: user.id }), // Include userId in the request body
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newTodo = await response.json();
      setTodos((prev) => [...prev, newTodo]);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    const response = await fetch(`http://localhost:8080/api/todos/${id}?userId=${user.id}`, {

      method: "PUT",
      body: JSON.stringify(updatedTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newTodo = await response.json();
      setTodos((prev) => prev.map((todo) => (todo.id === id ? newTodo : todo)));
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`http://localhost:8080/api/todos/${id}?userId=${user.id}`, {

      method: "DELETE",
    });

    if (response.ok) {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }
  };

  return <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>{children}</TodoContext.Provider>;
};

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodoProvider");
  }
  return context;
};
