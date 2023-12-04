package com.dh.toururuguay.service;

import com.dh.toururuguay.dto.ReservaDTO;
import com.dh.toururuguay.model.Reserva;
import com.dh.toururuguay.persistence.dao.impl.ReservaDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    private ReservaDao reservaDao;

    @Autowired
    public ReservaService(ReservaDao reservaDao) {
        this.reservaDao = reservaDao;
    }

    public Reserva registrarReserva(Reserva reserva) {
        return reservaDao.guardar(reserva);
    }

    public ReservaDTO registrarReservaDTO(ReservaDTO reserva) {
        return reservaDao.registrarReservaDTO(reserva);
    }  
    

    public List<Reserva> buscarTodos() {
        return reservaDao.buscarTodos();
    }

    public Optional<ReservaDTO> buscarReserva(Integer id) {
        return reservaDao.buscarReserva(id);
    }
}
