package com.dh.toururuguay.dto;

import java.util.List;

public class ProductDetailDTO {
    private Integer product_id;

    private String product_name;
    private String description;

    private String urlImagen;


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

    public String getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(String urlImagen) {
        this.urlImagen = urlImagen;
    }

    public ProductDetailDTO() {

    }
    public ProductDetailDTO(Integer product_id, String product_name, String description, String urlImagen) {
        this.product_id = product_id;
        this.product_name = product_name;
        this.description = description;
        this.urlImagen = urlImagen;
    }
}
