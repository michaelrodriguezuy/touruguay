package com.dh.toururuguay.controller;

import com.dh.toururuguay.model.Ciudad;
import com.dh.toururuguay.model.Rol;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    String username;
    String password;
    String name;
    String lastname;
    Ciudad city;
    Rol rol;
}
