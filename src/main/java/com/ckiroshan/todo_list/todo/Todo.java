package com.ckiroshan.todo_list.todo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Lombok annotations
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity // Indicates this class is a JPA entity
public class Todo {
    @Id // Specifies primary key of the entity
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generates the ID
    private Long id;
    private String text;
    private boolean completed;
    private String userId;
    private String name;
}
