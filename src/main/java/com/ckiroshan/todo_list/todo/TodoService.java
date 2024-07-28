package com.ckiroshan.todo_list.todo;

import java.util.List;

public interface TodoService {
    // Method to add a new Todo item, returning the added TodoDTO
    TodoDTO addTodo(TodoDTO todoDTO);

    // Method to retrieve a Todo item by its ID and the associated user ID
    TodoDTO getTodoByIdAndUser(Long todoId, String userId);

    // Method to retrieve all Todo items associated with a specific user ID
    List<TodoDTO> getTodosByUserId(String userId);

    // Method to update an existing Todo item, returning the updated TodoDTO
    TodoDTO updateTodo(Long todoId, String userId, TodoDTO updatedTodoDTO);

    // Method to delete a Todo item by its ID and the associated user ID
    void deleteTodoByIdAndUser(Long todoId, String userId);
}
