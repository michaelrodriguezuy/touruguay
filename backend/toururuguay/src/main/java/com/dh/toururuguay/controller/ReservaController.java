package com.dh.toururuguay.controller;

import com.dh.toururuguay.model.Reserva;
import com.dh.toururuguay.model.Rol;
import com.dh.toururuguay.service.ReservaService;
import com.dh.toururuguay.service.RolService;
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

    @GetMapping("/todosSinDTO")
    public ResponseEntity<List<Reserva>> buscarTodos(){
        return ResponseEntity.ok(reservaService.buscarTodos());
    }
}
