package com.dh.toururuguay.dto;

import com.dh.toururuguay.model.Categoria;
import com.dh.toururuguay.model.Producto;

public class ImagenDTO {
    private Integer imageId;
    private String url;
    private Producto producto;
    private Categoria categoria;

    public Integer getImageId() {
        return imageId;
    }

    public void setImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public ImagenDTO() {

    }

}
