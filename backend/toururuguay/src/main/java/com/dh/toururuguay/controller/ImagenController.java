package com.dh.toururuguay.controller;

import com.dh.toururuguay.dto.ImagenDTO;
import com.dh.toururuguay.model.Categoria;
import com.dh.toururuguay.model.Imagen;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.service.CategoriaService;
import com.dh.toururuguay.service.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/imagen")
public class ImagenController {

    @Autowired
    private ImagenService imagenService;

    //subirImagenS3
    @PostMapping
    public ResponseEntity<java.util.Map<java.lang.String, java.lang.String>> subirImagenS3(@RequestParam("imagen") List<MultipartFile> imagenes) {
try {

    boolean subidaExitosa = imagenService.subirImagenS3(imagenes);
    Map<String, String> response = new HashMap<>();

    if (subidaExitosa) {
        response.put("mensaje", "Las imágenes se subieron exitosamente.");
        return ResponseEntity.ok(response);
    } else {
        response.put("mensaje", "Error al subir las imágenes.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    } catch (RuntimeException e) {
        // Manejar la excepción según tus necesidades
        Map<String, String> response = new HashMap<>();
    response.put("mensaje", "Error al procesar y guardar las imágenes.");
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
    }

    @GetMapping("/todas")
    public ResponseEntity<List<ImagenDTO>> buscarTodas(){
        return ResponseEntity.ok(imagenService.buscarTodos());
    }


}
