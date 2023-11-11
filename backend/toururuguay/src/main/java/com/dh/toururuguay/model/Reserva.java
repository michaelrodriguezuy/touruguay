package com.dh.toururuguay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "booking")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer booking_id;

    private String title;
    private String description;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id")
    private Usuario user;

    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    private Producto product;

    public Integer getBooking_id() {
        return booking_id;
    }

    public void setBooking_id(Integer booking_id) {
        this.booking_id = booking_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public Reserva(Integer booking_id, String title, String description, Usuario user, Producto product) {
        this.booking_id = booking_id;
        this.title = title;
        this.description = description;
        this.user = user;
        this.product = product;
    }
}
