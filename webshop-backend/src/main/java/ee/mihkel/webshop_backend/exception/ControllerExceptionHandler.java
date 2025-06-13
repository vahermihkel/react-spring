package ee.mihkel.webshop_backend.exception;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.RestTemplate;

import java.sql.SQLException;
import java.util.Date;
import java.util.stream.Collectors;

@ControllerAdvice
public class ControllerExceptionHandler {

//    @ExceptionHandler
//    public ResponseEntity<ErrorMessage> handleException(DataIntegrityViolationException e) {
//        ErrorMessage errorMessage = new ErrorMessage();
//        if (e.getMessage().contains("duplicate key value violates unique constraint")) {
//            errorMessage.setMessage("Duplicate email");
//        } else {
//            errorMessage.setMessage("Unknown error");
//        }
//        errorMessage.setTimestamp(new Date());
//        errorMessage.setStatusCode(400);
//        return ResponseEntity.badRequest().body(errorMessage);
//    }
    @ExceptionHandler
    public ResponseEntity<ErrorMessage> handleException(ConstraintViolationException e) {
        ErrorMessage errorMessage = new ErrorMessage();
        String message = e.getConstraintViolations().stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.joining());
        errorMessage.setMessage(message);
        errorMessage.setTimestamp(new Date());
        errorMessage.setStatusCode(400);
        return ResponseEntity.badRequest().body(errorMessage);
    }

    @ExceptionHandler
    public ResponseEntity<ErrorMessage> handleException(RuntimeException e) {
        ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage(e.getMessage());
        errorMessage.setTimestamp(new Date());
        errorMessage.setStatusCode(400);
        return ResponseEntity.badRequest().body(errorMessage);
    }
}
