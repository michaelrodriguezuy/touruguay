package com.dh.toururuguay.controller.secure;

import com.dh.toururuguay.model.Favorito;
import com.dh.toururuguay.service.FavoritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/favorito")
public class FavoritoController {
    @Autowired
    private FavoritoService favoritoService;

    @PostMapping
    public ResponseEntity<Favorito> registrarFavorito(@RequestBody Favorito favorito) {
        return ResponseEntity.ok(favoritoService.registrarRol(favorito));
    }

    @GetMapping("/todosSinDTO")
    public ResponseEntity<List<Favorito>> buscarTodos(){
        return ResponseEntity.ok(favoritoService.buscarTodos());
    }
}
