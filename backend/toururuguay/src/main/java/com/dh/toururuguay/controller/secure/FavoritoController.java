package com.dh.toururuguay.controller.secure;

import com.dh.toururuguay.dto.FavoritoDTO;
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

    // guardo el favorito del usuario
    @PostMapping
    public ResponseEntity<List<Favorito>> registrarFavorito(@RequestBody List<Favorito> favoritos) {
        return ResponseEntity.ok(favoritoService.registrar(favoritos));
    }

    // todos los favoritos
    @GetMapping("/todosSinDTO")
    public ResponseEntity<List<Favorito>> buscarTodos() {
        return ResponseEntity.ok(favoritoService.buscarTodos());
    }

    // los favoritos del usuario ID
    @GetMapping("/{id}")
    public ResponseEntity<List<FavoritoDTO>> buscarFavorito(@PathVariable Integer id) {
        List<FavoritoDTO> favorito = favoritoService.buscarFavorito(id);
        return ResponseEntity.ok(favorito);
    }

    // elimino el favorito
    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarFavorito(@PathVariable Integer id) {
        favoritoService.eliminarFavorito(id);
        return ResponseEntity.ok("Favorito eliminado");
    }
}
