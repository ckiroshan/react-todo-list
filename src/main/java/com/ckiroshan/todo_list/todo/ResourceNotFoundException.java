package com.ckiroshan.todo_list.todo;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND) // Maps this exception to an HTTP 404 (Not Found) status
public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L; // Ensures compatibility across different JVM versions

    // Constructor with only a message
    public ResourceNotFoundException(String message) {
        super(message);
    }

    // Constructor with message and cause for exception chaining
    public ResourceNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    // Error code to give more structured error info
    private String errorCode;

    public ResourceNotFoundException(String message, String errorCode) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() {
        return errorCode;
    }
}
