package az.esam.kredit.kredit.exceptions;

import az.esam.kredit.kredit.dtos.responses.MessageResponse;
import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerException {

    @ExceptionHandler({UsernameNotFoundException.class, BadRequestException.class, StorageException.class, StorageFileNotFoundException.class})
    public ResponseEntity<MessageResponse> handleStudentNotFoundException(RuntimeException exception) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(new MessageResponse(HttpStatus.BAD_REQUEST, exception.getMessage()));
    }

    @ExceptionHandler({BadCredentialsException.class})
    public ResponseEntity<MessageResponse> handleStudentNotFoundException(BadCredentialsException exception) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(new MessageResponse(HttpStatus.UNAUTHORIZED, exception.getMessage()));
    }
}