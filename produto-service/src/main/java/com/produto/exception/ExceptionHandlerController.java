package com.produto.exception;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> validateError(ConstraintViolationException ex){
        return ResponseEntity.badRequest().body(ex.getConstraintName());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> otherErrors(Exception ex){
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }
}