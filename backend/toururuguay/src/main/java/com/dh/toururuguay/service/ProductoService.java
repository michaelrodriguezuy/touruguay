package com.dh.toururuguay.service;

import com.dh.toururuguay.dto.ProductoDTO;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.impl.ProductoDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    //este lo uso para testear o probar cosas, me trae todos los productos tal cual estan en la base
    public List<Producto> buscarTodos() {
        return productoDao.buscarTodos();
    }

    public List<ProductoDTO> buscarTodosDTO() {
        return productoDao.buscarTodosDTO();
    }

    public List<ProductoDTO> buscarProductosAleatorios(Integer cantidad) {
            return productoDao.buscarProductosAleatoriosDTO(cantidad);
        }
}
