package com.ckiroshan.todo_list.todo;

import lombok.*;

// Lombok annotations
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TodoDTO {
    private Long id;
    private String text;
    private boolean completed;
    private String userId;
    private String name;
}
