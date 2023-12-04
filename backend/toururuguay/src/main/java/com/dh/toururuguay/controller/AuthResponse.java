package com.dh.toururuguay.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    String token;
    private String name;
    private String lastname;
    private String username;
    private String rol;
    private String message;
    private String error;

    public AuthResponse(String message) {
        this.message = message;
    }

    public static AuthResponse forLogin(String token, String name, String lastname, String rol, String username) {
        return AuthResponse.builder()
                .token(token)
                .name(name)
                .lastname(lastname)
                .username(username)
                .rol(rol)
                .build();
    }

    public static AuthResponse forError(String error) {
        return AuthResponse.builder()
                .error(error)
                .build();
    }
}