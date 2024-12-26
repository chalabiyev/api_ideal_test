package az.esam.kredit.kredit.controller;

import az.esam.kredit.kredit.dtos.responses.MessageResponse;
import az.esam.kredit.kredit.entities.UploadedFile;
import az.esam.kredit.kredit.entities.User;
import az.esam.kredit.kredit.entities.enums.ERole;
import az.esam.kredit.kredit.repositories.UploadedFileRepository;
import az.esam.kredit.kredit.repositories.UserRepository;
import az.esam.kredit.kredit.services.internal.storage.StorageService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.Normalizer;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.security.core.userdetails.UsernameNotFoundException;

@CrossOrigin(origins = {"*"}, maxAge = 3600)
@RestController
@RequestMapping("/api/file")
public class FileController {

    Logger logger = Logger.getLogger(FileController.class.getName());

    @Autowired
    StorageService storageService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UploadedFileRepository uploadedFileRepository;

    private static final String ATTACHMENT_FILENAME = "attachment; filename=\"";
    private static final String COULD_NOT_DETERMINE_FILE_TYPE = "Could not determine file type.";

    @PostMapping("/uploadFile")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "isPublic", required = false, defaultValue = "false") boolean isPublic,
            Authentication authentication
    ) {
        try {
            var user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            String fileName = System.currentTimeMillis() + "_" + normalizeFileName(file.getOriginalFilename());
            logger.info(fileName);
            logger.info(file.toString());
            storageService.store(file, fileName);

            uploadedFileRepository.save(UploadedFile.builder()
                    .fileName(fileName)
                    .owner(user)
                    .isPublic(isPublic)
                    .upladedDate(new Date())
                    .build());
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(new MessageResponse(HttpStatus.OK, fileName));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @PostMapping("/uploadMultipleFile")
    public ResponseEntity<?> uploadFile(
            @RequestParam("file") List<MultipartFile> file,
            @RequestParam(value = "isPublic", required = false, defaultValue = "false") boolean isPublic,
            Authentication authentication
    ) {
        try {

            var user = authentication != null ? userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found")) : null;
            List<String> fileNames = new ArrayList<>();
            for (MultipartFile f : file) {
                String fileName = System.currentTimeMillis() + "_" + normalizeFileName(f.getOriginalFilename());
                logger.info(fileName);
                logger.info(f.toString());
                storageService.store(f, fileName);
                uploadedFileRepository.save(UploadedFile.builder()
                        .fileName(fileName)
                        .owner(user)
                        .isPublic(isPublic)
                        .upladedDate(new Date())
                        .build());
                fileNames.add(fileName);
            }
            return ResponseEntity
                    .status(HttpStatus.OK)
                    .body(fileNames);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    public static String normalizeFileName(String fileName) {
        String normalized = Normalizer.normalize(fileName, Normalizer.Form.NFD);

        // Remove diacritical marks (accents)
        normalized = normalized.replaceAll("\\p{M}", "");

        // Remove any characters that are not ASCII (non-Latin)
        String latinFileName = normalized.replaceAll("[^\\p{ASCII}]", "");

        // Replace spaces with underscores
        latinFileName = latinFileName.replaceAll(" ", "_");

        return latinFileName;
    }

    boolean isAdmin(User u) {
        return u.getRoles().stream().filter(f -> f.getName() == ERole.ROLE_ADMIN).count() > 0;
    }

    @GetMapping("/getFile/{fileName}")
    @PreAuthorize("isAuthenticated()")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    @ResponseBody
    public ResponseEntity<?> getFile(@PathVariable("fileName") String fileName, Authentication authentication, HttpServletRequest request) {
        try {
            logger.info("getFile");
            logger.info(fileName);
            var user = userRepository.findByUsername(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            logger.info(user.getUsername());
            UploadedFile uploadedFile = uploadedFileRepository.findByFileName(fileName)
                    .orElseThrow(() -> new Exception("File not found"));
            logger.info(uploadedFile.getId());
            logger.info("is admin : " + isAdmin(user));

            if (isAdmin(user) || uploadedFile.getOwner().getUsername().equals(user.getUsername())) {
                Resource file = storageService.loadAsResource(fileName);
                if (file == null) {
                    return ResponseEntity
                            .status(HttpStatus.BAD_REQUEST)
                            .build();
                }
                // Try to determine file's content type
                String contentType = null;
                try {
                    contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
                } catch (IOException ex) {
                    Logger.getLogger(AuthController.class.getName()).info("Could not determine file type.");
                    throw new RuntimeException(ex.getMessage());
                }

                // Fallback to the default content type if type could not be determined
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                        .body(file);
            } else {
                throw new Exception("Unauthorized file");
            }

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @GetMapping("/getPublicFile/{fileName}")
    @ResponseBody
    public ResponseEntity<?> getPublicFile(@PathVariable("fileName") String fileName, Authentication authentication, HttpServletRequest request) {
        try {
            UploadedFile uploadedFile = uploadedFileRepository.findByFileName(fileName)
                    .orElseThrow(() -> new Exception("File not found"));

            if (uploadedFile.isPublic()) {
                Resource file = storageService.loadAsResource(fileName);
                if (file == null) {
                    return ResponseEntity
                            .status(HttpStatus.BAD_REQUEST)
                            .build();
                }
                // Try to determine file's content type
                String contentType = null;
                try {
                    contentType = request.getServletContext().getMimeType(file.getFile().getAbsolutePath());
                } catch (IOException ex) {
                    Logger.getLogger(AuthController.class.getName()).info("Could not determine file type.");
                    throw new RuntimeException(ex.getMessage());
                }

                // Fallback to the default content type if type could not be determined
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                        .body(file);
            } else {
                throw new Exception("Yetkiniz yoxdur");
            }
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new MessageResponse(HttpStatus.BAD_REQUEST, e.getMessage()));
        }
    }

    @DeleteMapping("/deleteFile/{fileName}")
    @PreAuthorize("hasRole('ADMIN')")
    @SecurityRequirement(name = "authentication")
    @SecurityRequirement(name = "X-API-KEY")
    public ResponseEntity<Boolean> deleteFile(@PathVariable(value = "fileName", required = true) String fileName) throws Exception {
        return ResponseEntity.ok(storageService.deleteFile(fileName));
    }

}
