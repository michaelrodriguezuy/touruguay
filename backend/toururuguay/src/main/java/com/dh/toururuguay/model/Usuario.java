package com.dh.toururuguay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_id;

    private String user_name;
    private String password;
    private String name;
    private String last_name;
    private String email;

    @ManyToOne(optional = false)
    @JoinColumn(name = "role_id")
    private Rol role;

    @ManyToOne(optional = false)
    @JoinColumn(name = "city_id")
    private Ciudad city;

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Rol getRole() {
        return role;
    }

    public void setRole(Rol role) {
        this.role = role;
    }

    public Ciudad getCity() {
        return city;
    }

    public void setCity(Ciudad city) {
        this.city = city;
    }

    public Usuario(){

    }

    public Usuario(Integer user_id, String user_name, String password, String name, String last_name, String email, Rol role, Ciudad city) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.password = password;
        this.name = name;
        this.last_name = last_name;
        this.email = email;
        this.role = role;
        this.city = city;
    }
}
