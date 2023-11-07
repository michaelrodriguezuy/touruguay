package com.dh.toururuguay.service;

import com.dh.toururuguay.model.Categoria;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.IDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    private IDao<Categoria> categoriaDao;


    @Autowired
    public CategoriaService(IDao<Categoria> categoriaDao) {
        this.categoriaDao = categoriaDao;

    }

    public Categoria registrarCategoria(Categoria categoria) {
        return categoriaDao.guardar(categoria);
    }

    public List<Categoria> buscarTodas() {
        return categoriaDao.buscarTodos();
    }

}
