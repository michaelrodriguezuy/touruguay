package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.dto.CategoriaDTO;
import com.dh.toururuguay.dto.CategoriaImgDTO;
import com.dh.toururuguay.dto.ProductDetailDTO;
import com.dh.toururuguay.dto.ProductHomeDTO;
import com.dh.toururuguay.dto.ProductImgDTO;
import com.dh.toururuguay.model.Categoria;
import com.dh.toururuguay.model.Imagen;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.IDao;
import com.dh.toururuguay.service.ImagenService;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
@Transactional
public class CategoriaDao implements IDao<Categoria> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(CategoriaDao.class);

    private final ImagenService imagenService;

    @Autowired
    public CategoriaDao(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    @Transactional
    @Override
    public Categoria guardar(Categoria categoria) {
        List<Categoria> categorias = new ArrayList<>();
        categorias = buscarTodasSinDTO();
        Categoria categoriaEncontrada = buscarCategoriaPorNombre(categorias, categoria.getCategory_name());
        if (categoriaEncontrada != null) {
            log.info("La categoria ya existe");
            return null;
        } else {

            try {

                entityManager.persist(categoria);
                log.info("Categoria guardada con éxito");
                imagenService.guardarImagenesDelaCategoria(categoria);
                return categoria;

            } catch (Exception e) {
                log.error("Error al guardar la categoria", e);
                return null;
            }
        }
    }

    public List<Categoria> buscarTodasSinDTO() {
        try {
            return entityManager.createQuery(
                    "SELECT c FROM Categoria c ",
                    Categoria.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Transactional
    public List<CategoriaDTO> buscarTodasDTO() {
        try {
            List<Object[]> results = entityManager.createQuery(
                    "SELECT c, i " +
                            "FROM Categoria c " +
                            "LEFT JOIN Imagen i ON i.id = (SELECT MIN(ii.id) FROM Imagen ii WHERE ii.categoria = c) " +
                            "WHERE i IS NOT NULL",
                    Object[].class)
                    .getResultList();
            log.info("Cantidad de categorias encontradas: {}", results.size());

            List<CategoriaDTO> categoriaDTO = new ArrayList<>();

            results.forEach(result -> {
                Categoria categoria = (Categoria) result[0];
                Imagen imagen = (Imagen) result[1];

                CategoriaDTO newDTO = new CategoriaDTO();
                newDTO.setCategory_id(categoria.getCategory_id());
                newDTO.setCategory_name(categoria.getCategory_name());
                newDTO.setDescription(categoria.getDescription());
                newDTO.setUrlImagen(imagen.getImageUrl());
                categoriaDTO.add(newDTO);
            });
            return categoriaDTO;

        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al buscar las categorias", e);
            return Collections.emptyList();
        }
    }

    private static Categoria buscarCategoriaPorNombre(List<Categoria> lista, String nombre) {
        for (Categoria categoria : lista) {
            if (categoria.getCategory_name().equals(nombre)) {
                log.info("El nombre de la categoria ya existe");
                return categoria;
            }
        }
        return null;
    }

    @Transactional
    public Optional<CategoriaDTO> buscarCategoria(Integer id) {

        try {
            List<Object[]> results = entityManager.createQuery(
                    "SELECT i, c " +
                            "FROM Imagen i " +
                            "LEFT JOIN FETCH i.categoria c " +
                            "WHERE c.category_id = :categoryId",
                    Object[].class)
                    .setParameter("categoryId", id)
                    .getResultList();

            CategoriaDTO categoriaDTO = new CategoriaDTO();
            if (!results.isEmpty()) {

                results.forEach(result -> {
                    Imagen imagen = (Imagen) result[0];
                    Categoria categoria = (Categoria) result[1];

                    categoriaDTO.setCategory_id(categoria.getCategory_id());
                    categoriaDTO.setCategory_name(categoria.getCategory_name());
                    categoriaDTO.setDescription(categoria.getDescription());
                    categoriaDTO.setUrlImagen(imagen.getImageUrl());
                });
            }

            return Optional.of(categoriaDTO);

        } catch (Exception e) {

            e.printStackTrace();
            log.error("Error al buscar la categoria", e);
            return Optional.empty();
        }
    }

    @Transactional
    public void eliminarCategoriaImagenes(Integer id, boolean eliminarImagenes) {

        try {
            Categoria categoria = entityManager.find(Categoria.class, id);

            if (buscarImgCategoria(id).isPresent()) {

                if (eliminarImagenes) {
                    imagenService.eliminarImagenesDelaCategoria(categoria);
                    log.info("Se eliminaron las imagenes asociadas a la categoria");
                }
            }
            entityManager.remove(categoria);
            log.info("Se eliminó la categoria con éxito");
        } catch (EntityNotFoundException e) {

            throw new RuntimeException("No se encontró la categoria con ID: " + id, e);
        } catch (Exception e) {

            throw new RuntimeException("Error al intentar eliminar la categoria", e);
        }

    }

    @Transactional
    public Optional<CategoriaImgDTO> buscarImgCategoria(Integer id) {
        try {
            List<Object[]> results = entityManager.createQuery(
                    "SELECT i, c " +
                            "FROM Imagen i " +
                            "LEFT JOIN FETCH i.categoria c " +
                            "WHERE c.category_id = :categoryId",
                    Object[].class)
                    .setParameter("categoryId", id)
                    .getResultList();

            Map<Integer, CategoriaImgDTO> categoryMap = new HashMap<>();

            results.forEach(result -> {
                Imagen imagen = (Imagen) result[0];
                Categoria categoria = (Categoria) result[1];

                CategoriaImgDTO categoriaImgDTO = categoryMap.computeIfAbsent(categoria.getCategory_id(), k -> {
                    CategoriaImgDTO newDTO = new CategoriaImgDTO();

                    newDTO.setCategory_id(categoria.getCategory_id());
                    newDTO.setUrlImagen(new ArrayList<>());
                    return newDTO;
                });

                categoriaImgDTO.getUrlImagen().add(imagen.getImageUrl());
            });

            if (!categoryMap.isEmpty()) {

                return Optional.of(categoryMap.values().iterator().next());
            } else {
                return Optional.empty();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
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
        try {
            return entityManager.createQuery(
                    "SELECT c FROM Categoria c ", Categoria.class)
                    .getResultList();

        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Transactional
    @Override
    public Categoria actualizar(Categoria categoria) {
        try {
            log.info("Categoria a actualizar: {}", categoria);

            Categoria categoriaEncontrada = entityManager.find(Categoria.class, categoria.getCategory_id());
            List<Categoria> categorias = new ArrayList<>();
            categorias = buscarTodos();
            // quiero quitar del listado de categorias la categoria que estoy actualizando
            categorias.remove(categoriaEncontrada);

            // elimino las imagenes asociadas al categoria
            imagenService.eliminarImagenesDelaCategoria(categoria);
            log.info("Imagenes eliminadas con éxito");

            if (buscarCategoriaPorNombre(categorias, categoria.getCategory_name()) != null) {
                System.out.println("El nombre del categoria ya existe");
                return null;
            } else {
                categoriaEncontrada.setCategory_name(categoria.getCategory_name());
            }

            categoriaEncontrada.setDescription(categoria.getDescription());

            entityManager.merge(categoriaEncontrada);
            log.info("Categoria actualizada con éxito", categoriaEncontrada);

            // guardo las nuevas imagenes
            imagenService.guardarImagenesDelaCategoria(categoria);
            log.info("Nuevas imagenes guardadas con éxito");

            return categoriaEncontrada;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
