package com.dh.toururuguay.controller.secure;

import com.dh.toururuguay.dto.ProductDetailDTO;
import com.dh.toururuguay.dto.ProductHomeDTO;
import com.dh.toururuguay.dto.ProductImgDTO;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<List<ProductHomeDTO>> buscarTodosDTO(){
        return ResponseEntity.ok(productoService.buscarTodosDTO());
    }

    @GetMapping("/aleatorios")
    public ResponseEntity<List<ProductHomeDTO>> buscarProductosAleatorios(@RequestParam int cantidad) {
        List<ProductHomeDTO> productosAleatorios = productoService.buscarProductosAleatorios(cantidad);
        return ResponseEntity.ok(productosAleatorios);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailDTO> buscarProducto(@PathVariable Integer id) {
        ProductDetailDTO productDetail = productoService.buscarProducto(id).orElse(null);
        return ResponseEntity.ok(productDetail);
    }

    @GetMapping("img/{id}")
    public ResponseEntity<ProductImgDTO> buscarImgProducto(@PathVariable Integer id) {
        Optional<ProductImgDTO> productImgDTO = productoService.buscarImgProducto(id);

        if (productImgDTO.isPresent()) {
            return ResponseEntity.ok(productImgDTO.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }




}
