package com.dh.toururuguay.dto;

import java.util.List;

public class ProductImgDTO {
    private Integer product_id;
    private List<String> urlImagen;


    public Integer getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public List<String> getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(List<String> urlImagen) {
        this.urlImagen = urlImagen;
    }

    public ProductImgDTO() {

    }
    public ProductImgDTO(Integer product_id, List<String> urlImagen) {
        this.product_id = product_id;
        this.urlImagen = urlImagen;
    }
}
