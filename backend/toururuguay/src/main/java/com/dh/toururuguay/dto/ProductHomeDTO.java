package com.dh.toururuguay.dto;

import java.util.List;

public class ProductHomeDTO {
    private Integer product_id;

    private String product_name;
    private String description;
    private Double price;
    private String city;

    private String pais;
    private Integer categoria;

    private String urlImagen;

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
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

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public Integer getCategoria() {
        return categoria;
    }

    public void setCategoria(Integer categoria_id) {
        this.categoria = categoria_id;
    }

    public ProductHomeDTO() {

    }

    public ProductHomeDTO(Integer product_id, String product_name, String description, Double price, String city,
            String pais, String urlImagen, Integer categoria) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.description = description;
        this.price = price;
        this.city = city;
        this.pais = pais;
        this.urlImagen = urlImagen;
        this.categoria = categoria;
    }
}
