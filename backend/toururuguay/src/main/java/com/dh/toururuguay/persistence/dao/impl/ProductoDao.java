package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.dto.ProductDetailDTO;
import com.dh.toururuguay.dto.ProductHomeDTO;
import com.dh.toururuguay.dto.ProductImgDTO;
import com.dh.toururuguay.model.Imagen;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.IDao;

import com.dh.toururuguay.service.ImagenService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.NoResultException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

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
        try {
            Producto producto = entityManager.createQuery(
                            "SELECT p FROM Producto p WHERE p.product_id = :prodId\n", Producto.class)
                    .setParameter("prodId", id)
                    .getSingleResult();

            return Optional.ofNullable(producto);

        } catch (NoResultException e) {
            return Optional.empty();

        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Transactional
    public Optional<ProductDetailDTO> buscarProducto(Integer id) {

        try {
            List<Object[]> results = entityManager.createQuery(
                            "SELECT i, p " +
                                    "FROM Imagen i " +
                                    "LEFT JOIN FETCH i.producto p " +
                                    "WHERE p.product_id = :productId", Object[].class)
                    .setParameter("productId", id)
                    .getResultList();

            if (!results.isEmpty()) {
                Object[] result = results.get(0);
                Imagen imagen = (Imagen) result[0];
                Producto producto = (Producto) result[1];

                ProductDetailDTO newDTO = new ProductDetailDTO();
                newDTO.setProduct_id(producto.getProduct_id());
                newDTO.setProduct_name(producto.getProduct_name());
                newDTO.setDescription(producto.getDescription());

                newDTO.setUrlImagen(imagen.getImageUrl());

                return Optional.of(newDTO);
            } else {
                return Optional.empty();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }


    @Transactional
    public Optional<ProductImgDTO> buscarImgProducto(Integer id) {
        try {
            List<Object[]> results = entityManager.createQuery(
                            "SELECT i, p " +
                                    "FROM Imagen i " +
                                    "LEFT JOIN FETCH i.producto p " +
                                    "WHERE p.product_id = :productId", Object[].class)
                    .setParameter("productId", id)
                    .getResultList();

            Map<Integer, ProductImgDTO> productoMap = new HashMap<>();

            results.forEach(result -> {
                Imagen imagen = (Imagen) result[0];
                Producto producto = (Producto) result[1];

                ProductImgDTO productImgDTO = productoMap.computeIfAbsent(producto.getProduct_id(), k -> {
                    ProductImgDTO newDTO = new ProductImgDTO();
                    newDTO.setProduct_id(producto.getProduct_id());
                    newDTO.setUrlImagen(new ArrayList<>());
                    return newDTO;
                });

                // Agrega la URL de la imagen al listado de URLs en el DTO
                productImgDTO.getUrlImagen().add(imagen.getImageUrl());
            });

            if (!productoMap.isEmpty()) {
                // Devuelve el primer elemento del mapa (ya que estamos buscando por un ID específico)
                return Optional.of(productoMap.values().iterator().next());
            } else {
                return Optional.empty();
            }

        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
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

    @Transactional    
    public void eliminarProductoImagenes(Integer id, boolean eliminarImagenes) {
            

        try {
            Producto producto = entityManager.find(Producto.class, id);

//si el producto tiene asociaciones en la tabla images, aviso y espero respuesta del front
if(buscarImgProducto(id).isPresent()){                
    if (eliminarImagenes){
                imagenService.eliminarImagenesDelProducto(producto);
                 
                 System.out.println("Se eliminaron las imagenes asociadas al producto");
    }                                     
} 
            entityManager.remove(producto);

       } catch (EntityNotFoundException e) {
        
        throw new RuntimeException("No se encontró el producto con ID: " + id, e);
    } catch (Exception e) {
        
        throw new RuntimeException("Error al intentar eliminar el producto", e);
    }
            
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


    @Transactional
    public List<ProductHomeDTO> buscarTodosDTO() {
        try {
            List<Object[]> results = entityManager.createQuery(
                            "SELECT i, p " +
                                    "FROM Imagen i " +
                                    "LEFT JOIN FETCH i.producto p", Object[].class)
                    .getResultList();

            Map<Integer, ProductHomeDTO> productoMap = new HashMap<>();

            results.forEach(result -> {
                Imagen imagen = (Imagen) result[0];
                Producto producto = (Producto) result[1];

                ProductHomeDTO productHomeDTO = productoMap.computeIfAbsent(producto.getProduct_id(), k -> {
                    ProductHomeDTO newDTO = new ProductHomeDTO();
                    newDTO.setProduct_id(producto.getProduct_id());
                    newDTO.setProduct_name(producto.getProduct_name());
                    newDTO.setDescription(producto.getDescription());
                    newDTO.setPrice(producto.getPrice());
                    newDTO.setCity(producto.getCity().getCity_name());
                    newDTO.setPais(producto.getCity().getCountry().getCountry_name());
                    newDTO.setUrlImagen(new ArrayList<>());
                    return newDTO;
                });

                // Agrega la URL de la imagen al listado de URLs en el DTO
                productHomeDTO.getUrlImagen().add(imagen.getImageUrl());
            });

            return new ArrayList<>(productoMap.values());
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }


    private List<ProductHomeDTO> productosTemporales = new ArrayList<ProductHomeDTO>();
    private static final Random RANDOM_GENERATOR = new Random();

public List<ProductHomeDTO> buscarProductosAleatoriosDTO(int cantidad) {
    List<ProductHomeDTO> productosDTO = buscarTodosDTO();
    List<ProductHomeDTO> productosAleatoriosDTO = seleccionarProductosAleatoriosDTO(productosDTO, cantidad);
    return productosAleatoriosDTO;
}
    //devolver los datos necesarios, no todo el objeto

    private List<ProductHomeDTO> seleccionarProductosAleatoriosDTO(List<ProductHomeDTO> todosLosProductosDTO, int cantidad) {
        List<ProductHomeDTO> productosNuevosDTO = new ArrayList<>();

        while (productosNuevosDTO.size() < cantidad && !todosLosProductosDTO.isEmpty()) {
            int indiceAleatorio = RANDOM_GENERATOR.nextInt(todosLosProductosDTO.size());
            ProductHomeDTO productHomeDTOAleatorio = todosLosProductosDTO.remove(indiceAleatorio);

            if (!productosTemporales.contains(productHomeDTOAleatorio)) {
                productosNuevosDTO.add(productHomeDTOAleatorio);
                productosTemporales.add(productHomeDTOAleatorio);
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

@Transactional
    @Override
    public Producto actualizar(Producto producto) {
        try {
            Producto productoEncontrado = entityManager.find(Producto.class, producto.getProduct_id());            

            if (buscarProductoPorNombre(buscarTodos(), producto.getProduct_name()) != null) {
                System.out.println("El nombre del producto ya existe");
                return null;
            } else {
                productoEncontrado.setProduct_name(producto.getProduct_name());
            }
            
            productoEncontrado.setDescription(producto.getDescription());
            productoEncontrado.setPrice(producto.getPrice());
            productoEncontrado.setCategory(producto.getCategory());
            productoEncontrado.setCity(producto.getCity());
            entityManager.merge(productoEncontrado);
            return productoEncontrado;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
