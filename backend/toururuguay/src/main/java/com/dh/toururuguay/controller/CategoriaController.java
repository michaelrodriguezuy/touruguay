package com.dh.toururuguay.controller;

import com.dh.toururuguay.model.Categoria;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.service.CategoriaService;
import com.dh.toururuguay.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    @Autowired
    private CategoriaService categoriaService;

    @PostMapping
    public ResponseEntity<Categoria> registrarCategoria(@RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.registrarCategoria(categoria));
    }

    @GetMapping("/todas")
    public ResponseEntity<List<Categoria>> buscarTodas(){
        return ResponseEntity.ok(categoriaService.buscarTodas());
    }
    
}
