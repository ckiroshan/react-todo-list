package com.ckiroshan.todo_list.todo;

public class TodoMapper {

    // Map Todo entity to TodoDTO
    public static TodoDTO mapToTodoDTO(Todo todo) {
        return new TodoDTO(
                todo.getId(), // Maps the ID from Todo
                todo.getText(), // Maps the text from Todo
                todo.isCompleted(),
                todo.getUserId(),
                todo.getName()
        );
    }

    // Map TodoDTO to Todo entity
    public static Todo mapToTodo(TodoDTO todoDTO) {
        return new Todo(
                todoDTO.getId(), // Maps the ID from TodoDTO
                todoDTO.getText(), // Maps the text from TodoDTO
                todoDTO.isCompleted(),
                todoDTO.getUserId(),
                todoDTO.getName()
        );
    }
}
