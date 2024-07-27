package com.ckiroshan.todo_list.todo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository // Indicates this interface is a Spring Data repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
    // Find all Todo items by a specific user ID
    List<Todo> findByUserId(String userId);

    // Find a Todo item by its ID and the associated user ID
    Optional<Todo> findByIdAndUserId(Long id, String userId);
}
