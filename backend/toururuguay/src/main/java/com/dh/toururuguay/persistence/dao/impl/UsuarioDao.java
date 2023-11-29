package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.model.*;
import com.dh.toururuguay.persistence.dao.IDao;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class UsuarioDao implements IDao<Usuario> {
    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(ProductoDao.class);

    @Transactional
    @Override
    public Usuario guardar(Usuario usuario) {
        entityManager.persist(usuario);
        log.info("Usuario guardado con exito");
        return usuario;
    }

    @Override
    public Optional<Usuario> buscar(Integer id) {
        try {
            Usuario usuario = entityManager.createQuery(
                            "SELECT u FROM Usuario u WHERE u.user_id = :userId\n", Usuario.class)
                    .setParameter("userId", id)
                    .getSingleResult();

            return Optional.ofNullable(usuario);

        } catch (NoResultException e) {
            return Optional.empty();

        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }


    @Override
    public void eliminar(Integer id) {

    }

    //con esto devuelvo todos los datos completos
    @Transactional
    @Override
    public List<Usuario> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT u FROM Usuario u ", Usuario.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public Usuario actualizar(Usuario usuario) {
        return null;
    }
}
