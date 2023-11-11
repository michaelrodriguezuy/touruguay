package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.model.Ciudad;
import com.dh.toururuguay.model.Pais;
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
public class CiudadDao implements IDao<Ciudad> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(CiudadDao.class);

    @Transactional
    @Override
    public Ciudad guardar(Ciudad ciudad) {
        entityManager.persist(ciudad);
        return ciudad;
    }

    @Override
    public Optional<Ciudad> buscar(Integer id) {
        return Optional.empty();
    }

    @Override
    public void eliminar(Integer id) {

    }

    @Override
    public List<Ciudad> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT c FROM Ciudad c ", Ciudad.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<Ciudad> buscarProductosAleatorios(Integer cantidad) {
        return null;
    }

    @Override
    public Ciudad actualizar(Ciudad ciudad) {
        return null;
    }
}
