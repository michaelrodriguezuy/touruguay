package com.dh.toururuguay.controller.secure;

import com.dh.toururuguay.dto.ReservaDTO;
import com.dh.toururuguay.model.Reserva;
import com.dh.toururuguay.service.ReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
