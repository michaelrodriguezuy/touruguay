package com.dh.toururuguay.controller;

import com.dh.toururuguay.model.Rol;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.service.RolService;
import com.dh.toururuguay.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rol")
public class RolController {

    @Autowired
    private RolService rolService;

    @PostMapping
    public ResponseEntity<Rol> registrarRol(@RequestBody Rol rol) {
        return ResponseEntity.ok(rolService.registrarRol(rol));
    }

    @GetMapping("/todosSinDTO")
    public ResponseEntity<List<Rol>> buscarTodos(){
        return ResponseEntity.ok(rolService.buscarTodos());
    }
}
