package com.dh.toururuguay.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public class ReservaDTO {

    private Integer booking_id;
    private String title;
    private String description;

    private String user;

    private String product;

    private String City;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date desde;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date hasta;

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

    public String getCity() {
        return City;
    }

    public void setCity(String city) {
        this.City = city;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getProduct() {
        return product;
    }

    public void setProduct(String product) {
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

    public ReservaDTO() {

    }

    public ReservaDTO(Integer booking_id, String title, String description, String city, String user, String product,
            Date desde, Date hasta) {
        this.booking_id = booking_id;
        this.title = title;
        this.description = description;
        this.City = city;
        this.user = user;
        this.product = product;
        this.desde = desde;
        this.hasta = hasta;
    }

}
