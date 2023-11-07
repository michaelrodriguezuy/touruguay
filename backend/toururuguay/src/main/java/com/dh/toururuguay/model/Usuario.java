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
    private String lastname;
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id")
    private Rol role_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private Ciudad city_id;

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

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Rol getRole_id() {
        return role_id;
    }

    public void setRole_id(Rol role_id) {
        this.role_id = role_id;
    }

    public Ciudad getCity_id() {
        return city_id;
    }

    public void setCity_id(Ciudad city_id) {
        this.city_id = city_id;
    }

    public Usuario(Integer user_id, String user_name, String password, String name, String lastname, String email, Rol role_id, Ciudad city_id) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.role_id = role_id;
        this.city_id = city_id;
    }
}
