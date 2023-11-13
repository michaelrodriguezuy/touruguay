package com.dh.toururuguay.dto;

import com.dh.toururuguay.model.Ciudad;
import com.dh.toururuguay.model.Rol;

public class UsuarioDTO {

    private Integer user_id;

    private String user_name;
    private String name;
    private String last_name;

    private String rol;
    private String city;

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public UsuarioDTO(Integer user_id, String user_name, String name, String last_name, String rol, String city) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.name = name;
        this.last_name = last_name;
        this.rol = rol;
        this.city = city;
    }
    public UsuarioDTO() {

    }
}
