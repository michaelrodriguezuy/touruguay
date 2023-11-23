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

    public static AuthResponse forLogin(String token, String name, String lastname) {
        return AuthResponse.builder()
                .token(token)
                .name(name)
                .lastname(lastname)
                .build();
    }
}