package com.dh.toururuguay.service;

import com.dh.toururuguay.model.Reserva;
import com.dh.toururuguay.model.Rol;
import com.dh.toururuguay.persistence.dao.impl.ReservaDao;
import com.dh.toururuguay.persistence.dao.impl.RolDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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


    public List<Reserva> buscarTodos() {
        return reservaDao.buscarTodos();
    }
}
