package com.dh.toururuguay.controller.secure;

import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.service.UsuarioService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private static final Logger log = LoggerFactory.getLogger(ProductoController.class);

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/todos")
    public ResponseEntity<List<Usuario>> buscarTodos() {
        return ResponseEntity.ok(usuarioService.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.buscar(id);
        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<Usuario> actualizar(@RequestBody Usuario usuario) {

        ResponseEntity<Usuario> response = null;

        if (usuario.getUser_id() != null && usuarioService.buscar(usuario.getUser_id()).isPresent()) {

            response = ResponseEntity.ok(usuarioService.actualizar(usuario));
            log.info("Usuario actualizado");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            log.info("Usuario no encontrado");
        }
        return response;

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminar(@PathVariable Integer id) {

        ResponseEntity<String> response = null;

        if (usuarioService.buscar(id).isPresent()) {

            usuarioService.eliminar(id);
            response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminado");
            log.info("Usuario eliminado");
        } else {
            response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            log.info("Usuario no encontrado");
        }

        return response;
    }

}
