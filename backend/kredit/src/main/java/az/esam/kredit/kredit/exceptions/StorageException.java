
package az.esam.kredit.kredit.exceptions;

/**
 *
 * @author cihan
 */
public class StorageException extends RuntimeException {

    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
