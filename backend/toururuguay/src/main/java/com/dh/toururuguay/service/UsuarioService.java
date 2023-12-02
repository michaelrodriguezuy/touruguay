package com.dh.toururuguay.service;

import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.persistence.dao.impl.UsuarioDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private UsuarioDao usuarioDao;

    @Autowired
    public UsuarioService(UsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    public List<Usuario> buscarTodos() {
        return usuarioDao.buscarTodos();
    }

    public Optional<Usuario> buscar(Integer id){return this.usuarioDao.buscar(id);}

    public Usuario actualizar(Usuario usuario) {
        return usuarioDao.actualizar(usuario);
    }

    public void eliminar(Integer id) {
        usuarioDao.eliminar(id);
    }

}
