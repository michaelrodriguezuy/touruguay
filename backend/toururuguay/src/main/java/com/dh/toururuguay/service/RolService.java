package com.dh.toururuguay.service;

import com.dh.toururuguay.model.Rol;
import com.dh.toururuguay.persistence.dao.impl.RolDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolService {
    private RolDao rolDao;

    @Autowired
    public RolService(RolDao rolDao) {
        this.rolDao = rolDao;
    }

    public Rol registrarRol(Rol rol) {
        return rolDao.guardar(rol);
    }


    public List<Rol> buscarTodos() {
        return rolDao.buscarTodos();
    }
}
