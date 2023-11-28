package com.dh.toururuguay.service;

import com.dh.toururuguay.controller.AuthResponse;
import com.dh.toururuguay.controller.LoginRequest;
import com.dh.toururuguay.controller.RegisterRequest;
import com.dh.toururuguay.jwtConfig.JwtService;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.persistence.dao.impl.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    // private final UsuarioDao userRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        try {

            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
            String token = jwtService.getToken(user);

            String name = "";
            String lastname = "";
            String rol = "";

            if (user instanceof Usuario) {
                Usuario usuario = (Usuario) user;
                name = usuario.getName();
                lastname = usuario.getLastname();
                rol = usuario.getRol().getName();
            }

            // lo modifique para que la respuesta de login me devuelva el nombre y apellido
            // del usuario.
            return AuthResponse.forLogin(token, name, lastname, rol);
        } catch (BadCredentialsException e) {
            // Excepción lanzada si las credenciales (nombre de usuario o contraseña) son
            // incorrectas.
            return AuthResponse.forError("Credenciales inválidas. Verifica tu nombre de usuario y/o contraseña.");
        } catch (UsernameNotFoundException e) {
            // Excepción lanzada si el nombre de usuario no se encuentra en el sistema.
            return AuthResponse.forError("Nombre de usuario no encontrado.");

        } catch (Exception e) {
            return AuthResponse.forError("Error durante el proceso de autenticación.");
        }
    }

    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse("La Cuenta de usuario ya existe");
        }

        Usuario user = Usuario.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .name(request.getName())
                .lastname(request.getLastname())
                .rol(request.getRol())
                .build();

        userRepository.save(user);

        String name = user.getName();

        // el retorno del registro es el token generado y el nombre de usuario
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .name(name)
                .build();

    }
}
