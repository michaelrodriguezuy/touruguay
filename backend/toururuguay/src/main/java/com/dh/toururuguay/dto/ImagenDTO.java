package com.dh.toururuguay.dto;

import com.dh.toururuguay.model.Producto;

public class ImagenDTO {
    private Integer imageId;
    private String url;
    private Producto producto;


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
public ImagenDTO (){

}

}
