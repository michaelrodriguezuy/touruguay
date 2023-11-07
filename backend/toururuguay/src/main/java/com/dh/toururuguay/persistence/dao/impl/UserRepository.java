package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByUsername(String username);

    boolean existsByUsername(String username);
}
