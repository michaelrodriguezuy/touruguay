package com.dh.toururuguay.service;

import com.dh.toururuguay.dto.ProductDetailDTO;
import com.dh.toururuguay.dto.ProductHomeDTO;
import com.dh.toururuguay.dto.ProductImgDTO;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.impl.ProductoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {

    private ProductoDao productoDao;

    @Autowired
    public ProductoService(ProductoDao productoDao) {
        this.productoDao = productoDao;
    }

    public Producto registrarProducto(Producto producto) {
        return productoDao.guardar(producto);
    }

    // este lo uso para testear o probar cosas, me trae todos los productos tal cual
    // estan en la base
    public List<Producto> buscarTodos() {
        return productoDao.buscarTodos();
    }

    public List<ProductHomeDTO> buscarTodosDTO() {
        return productoDao.buscarTodosDTO();
    }

    public Optional<ProductDetailDTO> buscarProducto(Integer id) {
        return productoDao.buscarProducto(id);
    }

    public Optional<ProductImgDTO> buscarImgProducto(Integer id) {
        return (productoDao.buscarImgProducto(id));
    }

    public List<ProductHomeDTO> buscarProductosAleatorios(Integer cantidad) {
        return productoDao.buscarProductosAleatoriosDTO(cantidad);
    }

    public Optional<Producto> buscar(Integer id) {
        return productoDao.buscar(id);
    }

    public void eliminar(Integer id, boolean eliminarImagenes) {
        productoDao.eliminarProductoImagenes(id, eliminarImagenes);
    }

    public Producto actualizar(Producto producto) {
        return productoDao.actualizar(producto);
    }
}
