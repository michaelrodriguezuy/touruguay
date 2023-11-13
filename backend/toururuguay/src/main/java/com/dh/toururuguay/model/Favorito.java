package com.dh.toururuguay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "favourite")
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer favourite_id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Usuario user;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Producto product;

    public Integer getFavourite_id() {
        return favourite_id;
    }

    public void setFavourite_id(Integer favourite_id) {
        this.favourite_id = favourite_id;
    }

    public Usuario getUser() {
        return user;
    }

    public void setUser(Usuario user) {
        this.user = user;
    }

    public Producto getProduct() {
        return product;
    }

    public void setProduct(Producto product) {
        this.product = product;
    }

    public Favorito(){

    }

    public Favorito(Integer favourite_id, Usuario user, Producto product) {
        this.favourite_id = favourite_id;
        this.user = user;
        this.product = product;
    }
}
