package com.ckiroshan.todo_list.todo;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service // Indicates this class is a service component in Spring context
@AllArgsConstructor // Generates a constructor with required arguments for all final fields
public class TodoServiceImpl implements TodoService {

    // Dependencies
    private final TodoRepository todoRepository;

    @Override
    public TodoDTO addTodo(TodoDTO todoDTO) {
        // Convert TodoDTO to Todo entity
        Todo todo = TodoMapper.mapToTodo(todoDTO);
        // Save Todo entity
        Todo savedTodo = todoRepository.save(todo);
        // Convert Todo entity back to TodoDTO
        return TodoMapper.mapToTodoDTO(savedTodo);
    }

    @Override
    public TodoDTO getTodoByIdAndUser(Long todoId, String userId) {
        // Retrieve Todo entity by its ID & user ID
        Todo todo = todoRepository.findByIdAndUserId(todoId, userId)
                // Throw an exception if not found
                .orElseThrow(() ->
                        new ResourceNotFoundException("Todo with ID " + todoId + " for user ID " + userId + " not found"));
        // Convert Todo entity to TodoDTO
        return TodoMapper.mapToTodoDTO(todo);
    }

    @Override
    public List<TodoDTO> getTodosByUserId(String userId) {
        // Retrieve all Todo entities for the given user ID
        List<Todo> todos = todoRepository.findByUserId(userId);
        // Map list of Todo entities to list of TodoDTOs
        return todos.stream()
                .map(TodoMapper::mapToTodoDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TodoDTO updateTodo(Long todoId, String userId, TodoDTO updatedTodoDTO) {
        // Retrieve existing Todo entity by ID and user ID
        Todo todo = todoRepository.findByIdAndUserId(todoId, userId)
                // Throw an exception if not found
                .orElseThrow(() ->
                        new ResourceNotFoundException("Todo with ID " + todoId + " for user ID " + userId + " not found"));
        // Update the Todo entity properties with values from the updated TodoDTO
        todo.setText(updatedTodoDTO.getText());
        todo.setCompleted(updatedTodoDTO.isCompleted());
        // Save the updated Todo entity to repository
        Todo updatedTodo = todoRepository.save(todo);
        // Convert updated Todo entity to TodoDTO
        return TodoMapper.mapToTodoDTO(updatedTodo);
    }

    @Override
    public void deleteTodoByIdAndUser(Long todoId, String userId) {
        // Retrieve existing Todo entity by ID and user ID
        Todo todo = todoRepository.findByIdAndUserId(todoId, userId)
                // Throw an exception if not found
                .orElseThrow(() ->
                        new ResourceNotFoundException("Todo with ID " + todoId + " for user ID " + userId + " not found"));
        // Delete the found Todo entity from the repository
        todoRepository.delete(todo);
    }
}
