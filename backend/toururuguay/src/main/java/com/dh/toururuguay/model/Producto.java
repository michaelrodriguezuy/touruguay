package com.dh.toururuguay.model;

import jakarta.persistence.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "product")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer product_id;

    private String product_name;
    private String description;
    private String address;
    private Integer score;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Categoria category_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "city_id")
    private Ciudad city_id;

public Producto(){

}

    public Producto(Integer product_id, String product_name, String description, String address, Integer score, Categoria category_id, Ciudad city_id) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.description = description;
        this.address = address;
        this.score = score;
        this.category_id = category_id;
        this.city_id = city_id;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Categoria getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Categoria category_id) {
        this.category_id = category_id;
    }

    public Ciudad getCity_id() {
        return city_id;
    }

    public void setCity_id(Ciudad city_id) {
        this.city_id = city_id;
    }



    @Override
    public String toString() {
        return "Producto{" +
                "product_id=" + product_id +
                ", product_name='" + product_name + '\'' +
                ", description='" + description + '\'' +
                ", address='" + address + '\'' +
                ", score=" + score +
                ", category_id=" + category_id +
                ", city_id=" + city_id +
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