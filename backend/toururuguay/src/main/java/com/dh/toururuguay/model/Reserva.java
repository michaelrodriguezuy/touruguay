package com.dh.toururuguay.model;

import jakarta.persistence.*;

@Entity
@Table(name = "booking")
public class Reserva {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer booking_id;

    private String title;
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Usuario user_id;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private Ciudad city_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Categoria category_id;

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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Usuario getUser_id() {
        return user_id;
    }

    public void setUser_id(Usuario user_id) {
        this.user_id = user_id;
    }

    public Ciudad getCity_id() {
        return city_id;
    }

    public void setCity_id(Ciudad city_id) {
        this.city_id = city_id;
    }

    public Categoria getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Categoria category_id) {
        this.category_id = category_id;
    }

    public Reserva(Integer booking_id, String title, String descripcion, Usuario user_id, Ciudad city_id, Categoria category_id) {
        this.booking_id = booking_id;
        this.title = title;
        this.descripcion = descripcion;
        this.user_id = user_id;
        this.city_id = city_id;
        this.category_id = category_id;
    }
}
