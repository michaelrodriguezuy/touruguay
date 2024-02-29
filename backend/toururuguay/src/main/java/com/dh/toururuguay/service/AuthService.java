package com.dh.toururuguay.service;

import com.dh.toururuguay.controller.AuthResponse;
import com.dh.toururuguay.controller.LoginRequest;
import com.dh.toururuguay.controller.RegisterRequest;
import com.dh.toururuguay.jwtConfig.JwtService;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.persistence.dao.impl.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
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

    @Autowired
    private EmailService emailService;

    public AuthResponse login(LoginRequest request) {
        try {

<<<<<<< .merge_file_a21848
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
<<<<<<< HEAD
<<<<<<< .merge_file_a20944
<<<<<<< .merge_file_a34216
=======
=======
>>>>>>> .merge_file_a14884
=======
>>>>>>> 4187cebf0a0cb683cd83a99ab0335e38c9966ab4
=======
            name = usuario.getName();
            lastname = usuario.getLastname();
>>>>>>> e4c6ec0b1d7ea3fe5ace8acd2f65e7671195bd85
<<<<<<< HEAD
<<<<<<< .merge_file_a20944
>>>>>>> .merge_file_a31724
=======
>>>>>>> .merge_file_a14884
=======
>>>>>>> 4187cebf0a0cb683cd83a99ab0335e38c9966ab4
        }
        
        //lo modifique para que la respuesta de login me devuelva el nombre y apellido del usuario.
        return AuthResponse.forLogin(token, name, lastname, rol);
=======
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
            UserDetails user = userRepository.findByUsername(request.getUsername()).orElseThrow();
            String token = jwtService.getToken(user);

            Integer id = 0;
            String name = "";
            String lastname = "";
            String username = "";
            String rol = "";

            if (user instanceof Usuario) {
                Usuario usuario = (Usuario) user;
                id = usuario.getUser_id();
                name = usuario.getName();
                lastname = usuario.getLastname();
                username = usuario.getUsername();
                rol = usuario.getRol().getName();
            }

            // lo modifique para que la respuesta de login me devuelva el nombre y apellido
            // del usuario.
            return AuthResponse.forLogin(token, id, name, lastname, rol, username);
        } catch (BadCredentialsException e) {

            return AuthResponse.forError("Credenciales inválidas. Verifica tu nombre de usuario y/o contraseña.");
        } catch (UsernameNotFoundException e) {

            return AuthResponse.forError("Nombre de usuario no encontrado.");

        } catch (Exception e) {
            return AuthResponse.forError("Error durante el proceso de autenticación.");
        }
>>>>>>> .merge_file_a23644
    }
        catch (Exception e)
        {
            throw new RuntimeException(e);
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

        // activo el envio de correo
        emailService.enviarCorreoRegistro(user.getUsername(), user.getName(), user.getLastname());

        // el retorno del registro es el token generado y el nombre de usuario
        return AuthResponse.builder()
                .token(jwtService.getToken(user))
                .name(user.getName())
                .lastname(user.getLastname())
                .username(user.getUsername())
                .build();

    }

}
