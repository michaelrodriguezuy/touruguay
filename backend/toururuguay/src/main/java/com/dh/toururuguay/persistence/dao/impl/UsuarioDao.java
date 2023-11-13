package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.dto.UsuarioDTO;
import com.dh.toururuguay.model.Ciudad;
import com.dh.toururuguay.model.Rol;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.persistence.dao.IDao;
import jakarta.persistence.EntityManager;
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
        return usuario;
    }

    @Override
    public Optional<Usuario> buscar(Integer id) {
        return Optional.empty();
    }

    @Override
    public void eliminar(Integer id) {

    }

    //con esto devuelvo todos los datos completos
    @Override
    public List<Usuario> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT u FROM Usuario u " +
                                    "LEFT JOIN FETCH u.role " +
                                    "LEFT JOIN FETCH u.city", Usuario.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    //aca devuelvo al front solo los datos necesarios
    @Transactional
    public List<UsuarioDTO> buscarTodosDTO() {
        try {
            List<Object[]> results = entityManager.createQuery(
                            "SELECT u, r, c " +
                                    "FROM Usuario u " +
                                    "LEFT JOIN FETCH u.role r " +
                                    "LEFT JOIN FETCH u.city c", Object[].class)
                    .getResultList();

            List<UsuarioDTO> usuarioDTOList = new ArrayList<>();

            results.forEach(result -> {
                Usuario usuario = (Usuario) result[0];
                Rol rol = (Rol) result[1];
                Ciudad ciudad = (Ciudad) result[2];

                UsuarioDTO usuarioDTO = new UsuarioDTO();

                usuarioDTO.setUser_id(usuario.getUser_id());
                usuarioDTO.setUser_name(usuario.getUser_name());
                usuarioDTO.setName(usuario.getName());
                usuarioDTO.setLast_name(usuario.getLast_name());
                usuarioDTO.setRol(rol.getName());
                usuarioDTO.setCity(ciudad.getCity_name());

                usuarioDTOList.add(usuarioDTO);
            });

            return usuarioDTOList;

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }


    @Override
    public List<Usuario> buscarProductosAleatorios(Integer cantidad) {
        return null;
    }

    @Override
    public Usuario actualizar(Usuario usuario) {
        return null;
    }
}
