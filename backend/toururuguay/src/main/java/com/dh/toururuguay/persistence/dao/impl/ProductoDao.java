package com.dh.toururuguay.persistence.dao.impl;

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


import java.awt.*;
import java.io.IOException;
import java.nio.file.Path;
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
//            return entityManager.createQuery("SELECT p FROM Producto p", Producto.class).getResultList();

            return entityManager.createQuery(
                            "SELECT p FROM Producto p " +
                                    "LEFT JOIN FETCH p.category_id " +
                                    "LEFT JOIN FETCH p.city_id", Producto.class)
                    .getResultList();


        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    private List<Producto> productosTemporales = new ArrayList<>();
    private static final Random RANDOM_GENERATOR = new Random();

    public List<Producto> buscarProductosAleatorios(Integer cantidad) {
        return buscarProductosAleatorios(cantidad.intValue());
    }
    //devolver los datos necesarios, no todo el objeto
    public List<Producto> buscarProductosAleatorios(int cantidad) {
        List<Producto> productos = buscarTodos();
        return seleccionarProductosAleatorios(productos, cantidad);
    }
    private List<Producto> seleccionarProductosAleatorios(List<Producto> todosLosProductos, int cantidad) {
        List<Producto> productosNuevos = new ArrayList<>();

        while (productosNuevos.size() < cantidad && !todosLosProductos.isEmpty()) {
            int indiceAleatorio = RANDOM_GENERATOR.nextInt(todosLosProductos.size());
            Producto productoAleatorio = todosLosProductos.remove(indiceAleatorio);

            if (!productosTemporales.contains(productoAleatorio)) {
                productosNuevos.add(productoAleatorio);
                productosTemporales.add(productoAleatorio);
            }
       }
        //si ya mostre todos los productos de mi base, reinicio la comparativa
        if (todosLosProductos.size() < cantidad) {
            // Reinicia la lista temporal si no puedo devolver la cantidad de productos nuevos
            reiniciarProductosTemporales();
        }

        return productosNuevos;
    }

    private void reiniciarProductosTemporales() {
        productosTemporales.clear();
    }

    @Override
    public Producto actualizar(Producto producto) {
        return null;
    }

}
