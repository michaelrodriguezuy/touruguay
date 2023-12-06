package com.dh.toururuguay.service;

import com.dh.toururuguay.dto.CategoriaDTO;
import com.dh.toururuguay.dto.ProductDetailDTO;
import com.dh.toururuguay.model.Categoria;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.impl.CategoriaDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoriaService {

    private CategoriaDao categoriaDao;

    @Autowired
    public CategoriaService(CategoriaDao categoriaDao) {
        this.categoriaDao = categoriaDao;
    }

    public Categoria registrarCategoria(Categoria categoria) {
        return categoriaDao.guardar(categoria);
    }

    public List<CategoriaDTO> buscarTodasDTO() {
        return categoriaDao.buscarTodasDTO();
    }

    public List<Categoria> buscarTodasSinDTO() {
        return categoriaDao.buscarTodasSinDTO();
    }

    public Optional<CategoriaDTO> buscarCategoria(Integer id) {
        return categoriaDao.buscarCategoria(id);
    }

    public void eliminar(Integer id, boolean eliminarImagenes) {
        categoriaDao.eliminarCategoriaImagenes(id, eliminarImagenes);
    }

    public Categoria actualizar(Categoria categoria) {
        return categoriaDao.actualizar(categoria);
    }
}
