package com.dh.toururuguay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "role")
public class Rol {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer role_id;

    private String name;

    public Integer getRole_id() {
        return role_id;
    }

    public void setRole_id(Integer role_id) {
        this.role_id = role_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Rol(){

    }
    public Rol(Integer role_id, String name) {
        this.role_id = role_id;
        this.name = name;
    }
}
