package com.dh.toururuguay.service;

import com.dh.toururuguay.dto.FavoritoDTO;
import com.dh.toururuguay.model.Favorito;
import com.dh.toururuguay.persistence.dao.impl.FavoritoDao;
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

    public List<Favorito> registrar(List<Favorito> favoritos) {
        return favoritoDao.guardarFavoritos(favoritos);
    }

    public List<Favorito> buscarTodos() {
        return favoritoDao.buscarTodos();
    }

    public List<FavoritoDTO> buscarFavorito(Integer id) {
        return favoritoDao.buscarFavorito(id);
    }

    public void eliminarFavorito(Integer id) {
        favoritoDao.eliminar(id);
    }
}
