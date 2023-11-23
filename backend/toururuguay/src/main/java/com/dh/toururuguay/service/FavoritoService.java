package com.dh.toururuguay.service;

import com.dh.toururuguay.model.Favorito;
import com.dh.toururuguay.model.Rol;
import com.dh.toururuguay.persistence.dao.impl.FavoritoDao;
import com.dh.toururuguay.persistence.dao.impl.RolDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoritoService {
    private FavoritoDao favoritoDao;

    @Autowired
    public FavoritoService(FavoritoDao favoritoDao) {
        this.favoritoDao = favoritoDao;
    }

    public Favorito registrarRol(Favorito favorito) {
        return favoritoDao.guardar(favorito);
    }


    public List<Favorito> buscarTodos() {
        return favoritoDao.buscarTodos();
    }
}
