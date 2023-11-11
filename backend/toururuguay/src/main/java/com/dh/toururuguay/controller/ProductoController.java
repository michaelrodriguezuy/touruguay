package com.dh.toururuguay.controller;

import com.dh.toururuguay.dto.ProductoDTO;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/producto")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @PostMapping
    public ResponseEntity<Producto> registrarProducto(@RequestBody Producto producto) {
        return ResponseEntity.ok(productoService.registrarProducto(producto));
    }

    @GetMapping("/todosSinDTO")
    public ResponseEntity<List<Producto>> buscarTodos(){
        return ResponseEntity.ok(productoService.buscarTodos());
    }

    @GetMapping("/todos")
    public ResponseEntity<List<ProductoDTO>> buscarTodosDTO(){
        return ResponseEntity.ok(productoService.buscarTodosDTO());
    }

    @GetMapping("/aleatorios")
    public ResponseEntity<List<ProductoDTO>> buscarProductosAleatorios(@RequestParam int cantidad) {
        List<ProductoDTO> productosAleatorios = productoService.buscarProductosAleatorios(cantidad);
        return ResponseEntity.ok(productosAleatorios);
    }
}
