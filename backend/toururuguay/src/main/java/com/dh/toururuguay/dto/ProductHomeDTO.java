package com.dh.toururuguay.dto;

import java.util.List;

public class ProductHomeDTO {
    private Integer product_id;

    private String product_name;
    private String description;
    private String address;
    private String city;

    private String pais;
    //pais
    //costo

    private List<String> urlImagen;

    public List<String> getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(List<String> urlImagen) {
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
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

    public ProductHomeDTO() {

    }
    public ProductHomeDTO(Integer product_id, String product_name, String description, String address, String city, String pais, List<String> urlImagen) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.description = description;
        this.address = address;
        this.city = city;
        this.pais = pais;
        this.urlImagen = urlImagen;
    }
}
