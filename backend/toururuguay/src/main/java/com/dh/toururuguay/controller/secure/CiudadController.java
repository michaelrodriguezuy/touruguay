package com.dh.toururuguay.controller.secure;

import com.dh.toururuguay.model.Ciudad;
import com.dh.toururuguay.service.CiudadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ciudad")
public class CiudadController {

    @Autowired
    private CiudadService ciudadService;

    @PostMapping
    public ResponseEntity<Ciudad> registrarCiudad(@RequestBody Ciudad ciudad) {
        return ResponseEntity.ok(ciudadService.registrarCiudad(ciudad));
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Ciudad>> buscarTodos(){
        return ResponseEntity.ok(ciudadService.buscarTodos());
    }

}
