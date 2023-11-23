package com.dh.toururuguay.dto;

import java.util.ArrayList;
import java.util.List;

public class ProductDetailDTO {
    private Integer product_id;

    private String product_name;
    private String description;

    private Double price;
    private String city;
    private String pais;
    private List<String> urlImagen;

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
    
    public List<String> getUrlImagen() {
        if (urlImagen == null) {
            urlImagen = new ArrayList<>();
        }
        return urlImagen;
    }

    public void setUrlImagen(List<String> urlImagen) {
        this.urlImagen = urlImagen;
    }

    public ProductDetailDTO() {

    }

    public ProductDetailDTO(Integer product_id, String product_name, String description, Double price, String city, String pais,
            List<String> urlImagen) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.description = description;
        this.price = price;
        this.city = city;
        this.pais = pais;
        this.urlImagen = urlImagen;
    }
}
