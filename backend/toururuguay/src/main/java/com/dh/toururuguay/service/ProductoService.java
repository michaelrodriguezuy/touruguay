package com.dh.toururuguay.service;

import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.IDao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private IDao<Producto> productoDao;


    @Autowired
    public ProductoService(IDao<Producto> productoDao) {
        this.productoDao = productoDao;

    }

    public Producto registrarProducto(Producto producto) {
        return productoDao.guardar(producto);
    }

    public List<Producto> buscarTodos() {
        return productoDao.buscarTodos();
    }


    public List<Producto> buscarProductosAleatorios(Integer cantidad) {
            return productoDao.buscarProductosAleatorios(cantidad);
        }
}
