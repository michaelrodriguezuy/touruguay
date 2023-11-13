package com.dh.toururuguay.service;

import com.dh.toururuguay.dto.ProductoDTO;
import com.dh.toururuguay.dto.UsuarioDTO;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.persistence.dao.impl.ProductoDao;
import com.dh.toururuguay.persistence.dao.impl.UsuarioDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioService {
    private UsuarioDao usuarioDao;

    @Autowired
    public UsuarioService(UsuarioDao usuarioDao) {
        this.usuarioDao = usuarioDao;
    }

    public Usuario registrarUsuario(Usuario usuario) {
        return usuarioDao.guardar(usuario);
    }

    public List<UsuarioDTO> buscarTodosDTO() {
        return usuarioDao.buscarTodosDTO();
    }

    public List<Usuario> buscarTodos() {
        return usuarioDao.buscarTodos();
    }
}
