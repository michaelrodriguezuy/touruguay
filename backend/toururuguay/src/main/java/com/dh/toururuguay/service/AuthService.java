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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    //private final UsuarioDao userRepository;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse login(LoginRequest request) {
        try {

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            UserDetails user=userRepository.findByUsername(request.getUsername()).orElseThrow();
        String token=jwtService.getToken(user);
        
        String name ="";
        String lastname = "";
        String rol = "";

        if (user instanceof Usuario) {
            Usuario usuario = (Usuario) user;
<<<<<<< HEAD
             name = usuario.getName();
             lastname = usuario.getLastname();
                rol = usuario.getRol().getName();
<<<<<<< .merge_file_a20944
<<<<<<< .merge_file_a34216
=======
=======
>>>>>>> .merge_file_a14884
=======
            name = usuario.getName();
            lastname = usuario.getLastname();
>>>>>>> e4c6ec0b1d7ea3fe5ace8acd2f65e7671195bd85
<<<<<<< .merge_file_a20944
>>>>>>> .merge_file_a31724
=======
>>>>>>> .merge_file_a14884
        }
        
        //lo modifique para que la respuesta de login me devuelva el nombre y apellido del usuario.
        return AuthResponse.forLogin(token, name, lastname, rol);
    }
        catch (Exception e)
        {
            throw new RuntimeException(e);
        }
    }

    public AuthResponse register(RegisterRequest request) {
        Usuario user = Usuario.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode( request.getPassword()))
                .name(request.getName())
                .lastname(request.getLastname())                
                .rol(request.getRol())
                .build();

        userRepository.save(user);

        //el retorno del registro el token generado
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .build();

    }
}
