package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.model.Favorito;
import com.dh.toururuguay.model.Rol;
import com.dh.toururuguay.persistence.dao.IDao;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public class FavoritoDao implements IDao<Favorito> {
    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(ProductoDao.class);


    @Transactional
    @Override
    public Favorito guardar(Favorito favorito) {
        entityManager.persist(favorito);
        return favorito;
    }

    @Override
    public Optional<Favorito> buscar(Integer id) {
        return Optional.empty();
    }

    @Override
    public void eliminar(Integer id) {

    }

    @Override
    public List<Favorito> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT f FROM Favorito f ", Favorito.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<Favorito> buscarProductosAleatorios(Integer cantidad) {
        return null;
    }

    @Override
    public Favorito actualizar(Favorito favorito) {
        return null;
    }
}
