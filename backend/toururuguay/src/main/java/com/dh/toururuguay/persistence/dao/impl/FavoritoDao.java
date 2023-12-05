package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.dto.FavoritoDTO;
import com.dh.toururuguay.dto.ProductHomeDTO;
import com.dh.toururuguay.model.Favorito;
import com.dh.toururuguay.model.Imagen;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.persistence.dao.IDao;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public class FavoritoDao implements IDao<Favorito> {
    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(ProductoDao.class);

    @Override
    // aca podria recibir un ArrayList de favoritos para guardar, los que esten en
    // localStorage
    public Favorito guardar(Favorito favorito) {
        return null;
    }

    @Transactional
    public List<Favorito> guardarFavoritos(List<Favorito> favoritos) {
        // antes de guardar los favoritos, elimino los que ya estaban guardados
        eliminar(favoritos.get(0).getUser().getUser_id());
        try {
            favoritos.forEach(favorito -> entityManager.persist(favorito));
            log.info("Favoritos guardados con éxito");
            return favoritos;
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al guardar los favoritos", e);
            return Collections.emptyList();
        }
    }

    @Override
    public Optional<Favorito> buscar(Integer id) {
        return Optional.empty();
    }

    @Override
    public void eliminar(Integer id) {
        // elimino todos los favoritos del usuario
        try {
            entityManager.createQuery(
                    "DELETE FROM Favorito f " +
                            "WHERE f.user.user_id = :userId")
                    .setParameter("userId", id)
                    .executeUpdate();
            log.info("Favoritos eliminados con éxito");
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al eliminar los favoritos", e);
        }
    }

    @Override
    public List<Favorito> buscarTodos() {
        try {
            return entityManager.createQuery(
                    "SELECT f FROM Favorito f ", Favorito.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    // devuelvo los favoritos de un usuario
    public List<FavoritoDTO> buscarFavorito(Integer id) {
        try {
            List<Object[]> results = entityManager.createQuery(
                    "SELECT f, u, p " +
                            "FROM Favorito f " +
                            "LEFT JOIN FETCH f.user u " +
                            "LEFT JOIN FETCH f.product p " +
                            "WHERE u.user_id = :userId",
                    Object[].class)
                    .setParameter("userId", id)
                    .getResultList();
    
            List<FavoritoDTO> favoritoDTO = new ArrayList<>();
    
            results.forEach(result -> {
    
                Favorito favorito = (Favorito) result[0];
                Usuario usuario = (Usuario) result[1];
                Producto producto = (Producto) result[2];
    
                FavoritoDTO newDTO = new FavoritoDTO();
    
                // newDTO.setFavouriteId(favorito.getFavourite_id());
                // newDTO.setUser(usuario.getUser_id());
                newDTO.setProduct(producto.getProduct_id());
    
                favoritoDTO.add(newDTO);
            });
            return favoritoDTO;
    
        } catch (NoResultException e) {
            return Collections.emptyList();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al buscar los favoritos del usuario", e);
            return Collections.emptyList();
        }
    }
    

    @Override
    public Favorito actualizar(Favorito favorito) {
        return null;
    }

}
