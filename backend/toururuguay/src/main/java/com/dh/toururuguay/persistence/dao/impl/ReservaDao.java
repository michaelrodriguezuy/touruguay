package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.model.Reserva;
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
public class ReservaDao implements IDao<Reserva> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(ProductoDao.class);

    @Transactional
    @Override
    public Reserva guardar(Reserva reserva) {
        entityManager.persist(reserva);
        log.info("Reserva guardada con éxito");
        return reserva;
    }

    @Override
    public Optional<Reserva> buscar(Integer id) {
        return Optional.empty();
    }

    @Override
    public void eliminar(Integer id) {

    }

    @Override
    public List<Reserva> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT r FROM Reserva r ", Reserva.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }


    @Override
    public Reserva actualizar(Reserva reserva) {
        return null;
    }
}
