package com.dh.toururuguay.controller;

import com.dh.toururuguay.dto.ProductoDTO;
import com.dh.toururuguay.model.Pais;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.service.PaisService;
import com.dh.toururuguay.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pais")
public class PaisController {

    @Autowired
    private PaisService paisService;

    @PostMapping
    public ResponseEntity<Pais> registrarPais(@RequestBody Pais pais) {
        return ResponseEntity.ok(paisService.registrarPais(pais));
    }

    @GetMapping("/todos")
    public ResponseEntity<List<Pais>> buscarTodos(){
        return ResponseEntity.ok(paisService.buscarTodos());
    }


}
