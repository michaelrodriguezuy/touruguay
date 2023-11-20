package com.dh.toururuguay.service;

import com.dh.toururuguay.model.Pais;
import com.dh.toururuguay.persistence.dao.impl.PaisDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaisService {
    private PaisDao paisDao;

    @Autowired
    public PaisService(PaisDao paisDao) {
        this.paisDao = paisDao;
    }

    public Pais registrarPais(Pais pais) {
        return paisDao.guardar(pais);
    }

    public List<Pais> buscarTodos() {
        return paisDao.buscarTodos();
    }
}
