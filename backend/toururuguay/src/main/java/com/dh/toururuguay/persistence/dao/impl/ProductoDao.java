package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.dto.ProductoDTO;
import com.dh.toururuguay.model.Imagen;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.IDao;

import com.dh.toururuguay.service.ImagenService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import java.util.*;
import java.util.List;

@Repository
public class ProductoDao implements IDao<Producto> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(ProductoDao.class);
    private final ImagenService imagenService;

    @Autowired
    public ProductoDao(ImagenService imagenService) {
        this.imagenService = imagenService;
    }

    @Transactional
    @Override
    public Producto guardar(Producto producto) {
       // try {
//llamo a buscarTodos y pregunto si el nombre ya existe
            List<Producto> productos = new ArrayList<>();
            productos = buscarTodos();
            Producto productoEncontrado = buscarProductoPorNombre(productos, producto.getProduct_name());
            if (productoEncontrado != null) {
                System.out.println("El producto ya existe");
                return null;
            } else {

                entityManager.persist(producto);
                imagenService.guardarImagenesDelProducto(producto);
                return producto;
            }
            /*}  catch(Exception e){
                log.error("Error al guardar el producto", e);
                return null;
            }*/
    }
    @Override
    public Optional<Producto> buscar(Integer id) {
        return Optional.empty();
    }

    private static Producto buscarProductoPorNombre(List<Producto> lista, String nombre) {
        for (Producto producto : lista) {
            if (producto.getProduct_name().equals(nombre)) {
                return producto;
            }
        }
        return null;
    }

    @Override
    public void eliminar(Integer id) {

    }

    @Override
    public List<Producto> buscarTodos() {
        try{
            return entityManager.createQuery(
                            "SELECT p FROM Producto p " +
                                    "LEFT JOIN FETCH p.category " +
                                    "LEFT JOIN FETCH p.city", Producto.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<Producto> buscarProductosAleatorios(Integer cantidad) {
        return null;
    }

    @Transactional
    public List<ProductoDTO> buscarTodosDTO() {
        try {
            List<Object[]> results = entityManager.createQuery(
                            "SELECT i, p " +
                                    "FROM Imagen i " +
                                    "LEFT JOIN FETCH i.producto p", Object[].class)
                    .getResultList();

            Map<Integer, ProductoDTO> productoMap = new HashMap<>();

            results.forEach(result -> {
                Imagen imagen = (Imagen) result[0];
                Producto producto = (Producto) result[1];

                ProductoDTO productoDTO = productoMap.computeIfAbsent(producto.getProduct_id(), k -> {
                    ProductoDTO newDTO = new ProductoDTO();
                    newDTO.setProduct_id(producto.getProduct_id());
                    newDTO.setProduct_name(producto.getProduct_name());
                    newDTO.setDescription(producto.getDescription());
                    newDTO.setAddress(producto.getAddress());
                    newDTO.setCity(producto.getCity());
                    //falta pais y precio
                    newDTO.setUrlImagen(new ArrayList<>());
                    return newDTO;
                });

                // Agrega la URL de la imagen al listado de URLs en el DTO
                productoDTO.getUrlImagen().add(imagen.getImageUrl());
            });

            return new ArrayList<>(productoMap.values());
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }


    private List<ProductoDTO> productosTemporales = new ArrayList<ProductoDTO>();
    private static final Random RANDOM_GENERATOR = new Random();

public List<ProductoDTO> buscarProductosAleatoriosDTO(int cantidad) {
    List<ProductoDTO> productosDTO = buscarTodosDTO();
    List<ProductoDTO> productosAleatoriosDTO = seleccionarProductosAleatoriosDTO(productosDTO, cantidad);
    return productosAleatoriosDTO;
}
    //devolver los datos necesarios, no todo el objeto

    private List<ProductoDTO> seleccionarProductosAleatoriosDTO(List<ProductoDTO> todosLosProductosDTO, int cantidad) {
        List<ProductoDTO> productosNuevosDTO = new ArrayList<>();

        while (productosNuevosDTO.size() < cantidad && !todosLosProductosDTO.isEmpty()) {
            int indiceAleatorio = RANDOM_GENERATOR.nextInt(todosLosProductosDTO.size());
            ProductoDTO productoDTOAleatorio = todosLosProductosDTO.remove(indiceAleatorio);

            if (!productosTemporales.contains(productoDTOAleatorio)) {
                productosNuevosDTO.add(productoDTOAleatorio);
                productosTemporales.add(productoDTOAleatorio);
            }
        }

        // si ya mostré todos los productos de mi base, reinicio la comparativa
        if (todosLosProductosDTO.size() < cantidad) {
            reiniciarProductosTemporales();
        }

        return productosNuevosDTO;
    }

    private void reiniciarProductosTemporales() {
        productosTemporales.clear();
    }

    @Override
    public Producto actualizar(Producto producto) {
        return null;
    }

}
