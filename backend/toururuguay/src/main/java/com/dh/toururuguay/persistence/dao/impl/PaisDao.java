package com.dh.toururuguay.persistence.dao.impl;

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
public class PaisDao implements IDao<Pais> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(PaisDao.class);

    @Transactional
    @Override
    public Pais guardar(Pais pais) {
            entityManager.persist(pais);
            return pais;
    }

    @Override
    public Optional<Pais> buscar(Integer id) {
        return Optional.empty();
    }

    @Override
    public void eliminar(Integer id) {

    }

    @Override
    public List<Pais> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT p FROM Pais p ", Pais.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<Pais> buscarProductosAleatorios(Integer cantidad) {
        return null;
    }

    @Override
    public Pais actualizar(Pais pais) {
        return null;
    }
}
