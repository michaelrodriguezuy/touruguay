package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.model.Categoria;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.IDao;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@Transactional
public class CategoriaDao implements IDao<Categoria> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(CategoriaDao.class);

    @Override
    public Categoria guardar(Categoria categoria) {
        try {

            entityManager.persist(categoria);
            return categoria;

    } catch (Exception e) {
            log.error("Error al guardar la categoria", e);
            return null;
        }
    }

    @Override
    public Optional<Categoria> buscar(Integer id) {
        return Optional.empty();
    }


    @Override
    public void eliminar(Integer id) {

    }

    @Override
    public List<Categoria> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT c FROM Categoria c ", Categoria.class)
                    .getResultList();

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public Categoria actualizar(Categoria categoria) {
        return null;
    }

    @Override
    public List<Categoria> buscarProductosAleatorios(Integer cantidad) {
        return null;
    }
}
