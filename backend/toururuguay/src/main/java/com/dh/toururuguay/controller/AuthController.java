package com.dh.toururuguay.controller;

import com.dh.toururuguay.controller.secure.ProductoController;
import com.dh.toururuguay.service.AuthService;
import com.dh.toururuguay.service.EmailService;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor // lo usamos para hacer obligatorio que se agregue el constructor con todos los
                         // argumentos
// genera getter y setter de forma automatica

public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(ProductoController.class);

    private final AuthService authService;
    private final EmailService emailService;

    private RegisterRequest usuarioRegistrado;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        usuarioRegistrado = request;
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/email")
    public ResponseEntity<?> email() {

        log.info("usuario registrado: {}", usuarioRegistrado);  

        if (usuarioRegistrado != null) {            
            emailService.enviarCorreoRegistro(
                    usuarioRegistrado.getUsername(),
                    usuarioRegistrado.getName(),
                    usuarioRegistrado.getLastname());
            usuarioRegistrado = null;
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(400).body("No hay datos de registro disponibles");
        }
    }

    @GetMapping("/health")
    public ResponseEntity<?> health() {

        try {
            InputStream inputStream = getClass().getResourceAsStream("/TOURuguay.png");
            byte[] imageBytes = IOUtils.toByteArray(inputStream);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(new ByteArrayResource(imageBytes));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al cargar la imagen");
        }
    }

}
