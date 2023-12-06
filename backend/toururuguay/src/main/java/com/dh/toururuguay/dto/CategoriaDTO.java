package com.dh.toururuguay.dto;

public class CategoriaDTO {

    private Integer category_id;

    private String category_name;
    private String description;

    private String urlImagen;

    public Integer getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Integer category_id) {
        this.category_id = category_id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
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

    public void setUrlImagen(String url) {
        this.urlImagen = url;
    }

    public CategoriaDTO() {
    }

    public CategoriaDTO(Integer id, String category_name, String description, String urlImagen) {
        this.category_id = id;
        this.category_name = category_name;
        this.description = description;
        this.urlImagen = urlImagen;
    }

}
