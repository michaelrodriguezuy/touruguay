package com.dh.toururuguay.service;

import com.dh.toururuguay.model.Ciudad;
import com.dh.toururuguay.persistence.dao.impl.CiudadDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CiudadService {
    private CiudadDao ciudadDao;

    @Autowired
    public CiudadService(CiudadDao ciudadDao) {
        this.ciudadDao = ciudadDao;
    }

    public Ciudad registrarCiudad(Ciudad ciudad) {
        return ciudadDao.guardar(ciudad);
    }

    public List<Ciudad> buscarTodos() {
        return ciudadDao.buscarTodos();
    }
}
