package com.ckiroshan.todo_list.todo;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*") // Allows cross-origin requests from any source
@AllArgsConstructor // Generates a constructor with required arguments for all final fields
@RestController // Indicates this class is a REST controller
@RequestMapping("/api/todos") // Base URL mapping for all methods in this controller
public class TodoController {
    // Dependencies
    private final TodoService todoService;

    // Create a new Todo
    @PostMapping
    public ResponseEntity<TodoDTO> createTodo(@RequestBody TodoDTO todoDTO) {
        // Call the service to add the Todo and return the created TodoDTO
        TodoDTO createdTodo = todoService.addTodo(todoDTO);
        // Return created response with HTTP status 201
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    // Get a Todo by ID for a specific user
    @GetMapping("{id}")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable Long id, @RequestParam String userId) {
        // Retrieve the TodoDTO for the specified ID and user ID
        TodoDTO todoDTO = todoService.getTodoByIdAndUser(id, userId);
        // Return 200 OK with the found TodoDTO
        return ResponseEntity.ok(todoDTO);
    }

    // Get all Todos for a specific user
    @GetMapping
    public ResponseEntity<List<TodoDTO>> getAllTodos(@RequestParam String userId) {
        // Retrieve all TodoDTOs for the specified user ID
        List<TodoDTO> todos = todoService.getTodosByUserId(userId);
        // Return 200 OK with the list of TodoDTOs
        return ResponseEntity.ok(todos);
    }

    // Update a Todo for a specific user
    @PutMapping("{id}")
    public ResponseEntity<TodoDTO> updateTodo(@PathVariable Long id, @RequestBody TodoDTO todoDTO, @RequestParam String userId) {
        // Call the service to update the Todo and return the updated TodoDTO
        TodoDTO updatedTodo = todoService.updateTodo(id, userId, todoDTO);
        // Return 200 OK with the updated TodoDTO
        return ResponseEntity.ok(updatedTodo);
    }

    // Delete a Todo for a specific user
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id, @RequestParam String userId) {
        // Call the service to delete the Todo
        todoService.deleteTodoByIdAndUser(id, userId);
        // Return 204 No Content response
        return ResponseEntity.noContent().build();
    }

}
