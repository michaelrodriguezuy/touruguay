package com.dh.toururuguay.controller.secure;

import com.dh.toururuguay.model.Pais;
import com.dh.toururuguay.service.PaisService;
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
