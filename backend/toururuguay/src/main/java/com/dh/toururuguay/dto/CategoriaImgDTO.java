package com.dh.toururuguay.dto;

import java.util.List;

public class CategoriaImgDTO {

    private Integer category_id;
    private List<String> urlImagen;

    public Integer getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Integer id) {
        this.category_id = id;
    }

    public List<String> getUrlImagen() {
        return urlImagen;
    }

    public void setUrlImagen(List<String> urlImagen) {
        this.urlImagen = urlImagen;
    }

    public CategoriaImgDTO() {

    }

    public CategoriaImgDTO(Integer category_id, List<String> urlImagen) {
        this.category_id = category_id;
        this.urlImagen = urlImagen;
    }
}
