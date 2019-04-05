package com.treez.test.dto.error;


import java.util.Arrays;
import java.util.List;

public class ApiError {
  private String status;
  private String message;
  private List<String> errors;

  public ApiError(String status, String message, List<String> errors) {
    super();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  public ApiError(String status, String message, String error) {
    super();
    this.status = status;
    this.message = message;
    errors = Arrays.asList(error);
  }

  public String getStatus() {
    return status;
  }

  public String getMessage() {
    return message;
  }

  public List<String> getErrors() {
    return errors;
  }
}
