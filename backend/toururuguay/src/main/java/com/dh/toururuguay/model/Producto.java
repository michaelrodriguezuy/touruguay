package com.dh.toururuguay.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "product")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;

    private String product_name;
    private String description;
    //private String address;
    private Double price;
    private String address;
    @ManyToOne()
    @JoinColumn(name = "category_id")
    private Categoria category;
    @ManyToOne()
    @JoinColumn(name = "city_id")
    private Ciudad city;

public Producto(){

}

    public Producto(Integer product_id, String product_name, String description, Double price, Categoria category, Ciudad city, String address) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.city = city;
        this.address=address;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public String getProduct_name() {
        return product_name;
    }

    public void setProduct_name(String product_name) {
        this.product_name = product_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Categoria getCategory() {
        return category;
    }

    public void setCategory(Categoria category) {
        this.category = category;
    }

    public Ciudad getCity() {
        return city;
    }

    public void setCity(Ciudad city) {
        this.city = city;
    }



    @Override
    public String toString() {
        return "Producto{" +
                "product_id=" + product_id +
                ", product_name='" + product_name + '\'' +
                ", description='" + description + '\'' +
                ", price=" + price +
                ", category=" + category +
                ", city=" + city +
                ", address=" + address +
                '}';
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Producto producto = (Producto) o;
        return Objects.equals(product_id, producto.getProduct_id()) &&
                Objects.equals(product_name, producto.getProduct_name()) &&
                Objects.equals(description, producto.getDescription());
    }
    @Override
    public int hashCode() {
        return Objects.hash(this.product_id, this.product_name, this.description);
    }

}