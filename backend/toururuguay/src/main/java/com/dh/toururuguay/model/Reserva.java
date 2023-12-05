package com.dh.toururuguay.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

@Entity
@Table(name = "booking")
public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer booking_id;
    private String title;
    private String description;

    @Column(name = "date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date date;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private Usuario user;

    // @ManyToOne(optional = false)
    // @JoinColumn(name = "city_id")
    // private Ciudad city;

    @ManyToOne()
    @JoinColumn(name = "product_id")
    private Producto product;

    @Column(name = "start_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date desde;

    @Column(name = "end_date")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date hasta;

    // public Ciudad getCity() {
    //     return city;
    // }

    // public void setCity(Ciudad city) {
    //     this.city = city;
    // }

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

    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;

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

    public Date getDesde() {
        return desde;
    }

    public void setDesde(Date desde) {
        this.desde = desde;
    }

    public Date getHasta() {
        return hasta;
    }

    public void setHasta(Date hasta) {
        this.hasta = hasta;
    }

    public Reserva() {

    }

    public Reserva(Integer booking_id, String title, String description, Date date, Usuario user, Producto product, 
            Date desde, Date hasta) {
        this.booking_id = booking_id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.user = user;
        this.product = product;
        // this.city = city;
        this.desde = desde;
        this.hasta = hasta;
    }
}
