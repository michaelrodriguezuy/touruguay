package com.dh.toururuguay.controller;
import com.dh.toururuguay.dto.UsuarioDTO;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<Usuario> registrarUsuario(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.registrarUsuario(usuario));
    }
    @GetMapping("/todos")
    public ResponseEntity<List<UsuarioDTO>> buscarTodosDTO(){
        return ResponseEntity.ok(usuarioService.buscarTodosDTO());
    }
    @GetMapping("/todosSinDTO")
    public ResponseEntity<List<Usuario>> buscarTodos(){
        return ResponseEntity.ok(usuarioService.buscarTodos());
    }
}
