package com.dh.toururuguay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favourite")
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer favourite_id;

    private Usuario user_id;
    private Producto product_id;

    public Integer getFavourite_id() {
        return favourite_id;
    }

    public void setFavourite_id(Integer favourite_id) {
        this.favourite_id = favourite_id;
    }

    public Usuario getUser_id() {
        return user_id;
    }

    public void setUser_id(Usuario user_id) {
        this.user_id = user_id;
    }

    public Producto getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Producto product_id) {
        this.product_id = product_id;
    }

    public Favorito(Integer favourite_id, Usuario user_id, Producto product_id) {
        this.favourite_id = favourite_id;
        this.user_id = user_id;
        this.product_id = product_id;
    }
}
