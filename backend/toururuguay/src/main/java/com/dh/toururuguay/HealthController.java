package com.dh.toururuguay;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

@RestController
public class HealthController {

    @GetMapping("/health")
    public ResponseEntity<?> health() {

        try {
            // Lee la imagen en forma de bytes
            InputStream inputStream = getClass().getResourceAsStream("/TOURuguay.png");
            byte[] imageBytes = IOUtils.toByteArray(inputStream);

            // Configura las cabeceras de la respuesta
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);

            // Retorna solo la imagen como ByteArrayResource
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(new ByteArrayResource(imageBytes));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error al cargar la imagen");
        }
    }
}
