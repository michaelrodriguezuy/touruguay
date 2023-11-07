package com.dh.toururuguay.persistence.dao;

import com.dh.toururuguay.model.Imagen;

import java.util.List;
import java.util.Optional;

public interface IDao<T> {

    T guardar(T t);

    Optional<T> buscar(Integer id);
    void eliminar(Integer id);
    List<T> buscarTodos();
  List<T> buscarProductosAleatorios(Integer cantidad);
    T actualizar(T t);

}
