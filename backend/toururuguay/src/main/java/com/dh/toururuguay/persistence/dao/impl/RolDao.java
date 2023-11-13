package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.model.Rol;
import com.dh.toururuguay.model.Usuario;
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
public class RolDao implements IDao<Rol> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(ProductoDao.class);

    @Transactional
    @Override
    public Rol guardar(Rol rol) {
        entityManager.persist(rol);
        return rol;
    }

    @Override
    public Optional<Rol> buscar(Integer id) {
        return Optional.empty();
    }

    @Override
    public void eliminar(Integer id) {

    }

    @Override
    public List<Rol> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT r FROM Rol r ", Rol.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<Rol> buscarProductosAleatorios(Integer cantidad) {
        return null;
    }

    @Override
    public Rol actualizar(Rol rol) {
        return null;
    }
}
