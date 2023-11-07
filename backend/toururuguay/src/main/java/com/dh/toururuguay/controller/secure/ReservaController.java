package com.dh.toururuguay.controller.secure;

import com.dh.toururuguay.dto.ProductHomeDTO;
import com.dh.toururuguay.dto.ReservaDTO;
import com.dh.toururuguay.model.Reserva;
import com.dh.toururuguay.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @PostMapping
    public ResponseEntity<Reserva> registrarReserva(@RequestBody Reserva reserva) {
        return ResponseEntity.ok(reservaService.registrarReserva(reserva));
    }

    // public ResponseEntity<ReservaDTO> registrarReserva(@RequestBody ReservaDTO
    // reserva) {
    // ReservaDTO reservaDTO = reservaService.registrarReservaDTO(reserva);
    // return ResponseEntity.ok(reservaDTO);
    // }

    @GetMapping("/todosSinDTO")
    public ResponseEntity<List<Reserva>> buscarTodos() {
        return ResponseEntity.ok(reservaService.buscarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservaDTO> buscarReserva(@PathVariable Integer id) {
        ReservaDTO reserva = reservaService.buscarReserva(id).orElse(null);
        return ResponseEntity.ok(reserva);
    }

    @GetMapping("/producto/{id}")
    public ResponseEntity<List<ReservaDTO>> buscarReservasPorProducto(@PathVariable Integer id) {
        List<ReservaDTO> reservas = reservaService.buscarReservasPorProducto(id);
        return ResponseEntity.ok(reservas);
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<List<ReservaDTO>> buscarReservasPorUsuario(@PathVariable Integer id) {
        List<ReservaDTO> reservas = reservaService.buscarReservasPorUsuario(id);
        return ResponseEntity.ok(reservas);
    }

    // devuelve fechas reservadas de un producto
    @GetMapping("/fechas/{id}")
    public ResponseEntity<List<String>> devuelveFechasReservadasDelProducto(@PathVariable Integer id) {
        List<String> fechas = reservaService.devuelveFechasReservadasDelProducto(id);
        return ResponseEntity.ok(fechas);
    }

    // devuelvo productos disponibles en un rango de fechas
    @GetMapping("/disponibles")
    public ResponseEntity<List<ProductHomeDTO>> devuelveProductosDisponiblesEnRango(
        @RequestParam("desde") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String desde,
        @RequestParam("hasta") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) String hasta) {

            Date fechaDesde = Date.valueOf(desde);
            Date fechaHasta = Date.valueOf(hasta);

        List<ProductHomeDTO> productosDisponibles = reservaService.devuelveProductosDisponiblesEnRangoDeFechas(fechaDesde,
                fechaHasta);
        return ResponseEntity.ok(productosDisponibles);
    }

    // devuelvo productos que coinciden con el texto ingresado
    @GetMapping("/buscar")
    public ResponseEntity<List<ProductHomeDTO>> buscarProductosPorTexto(@RequestParam("texto") String texto) {
        List<ProductHomeDTO> productos = reservaService.buscarProductosPorTexto(texto);
        return ResponseEntity.ok(productos);
    }
}
