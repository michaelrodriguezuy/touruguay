package com.dh.toururuguay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.servlet.http.Part;

import java.io.IOException;
import java.io.InputStream;

@Entity
@Table(name = "image")
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer image_id;
    private String url;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Producto producto;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Categoria categoria;

    @Transient
    private Part imagen;

    public Integer getId() {
        return image_id;
    }

    public void setId(Integer id) {
        this.image_id = id;
    }

    public String getImageUrl() {
        return url;
    }

    public void setImageUrl(String imageUrl) {
        this.url = imageUrl;
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

    public InputStream getInputStream() throws IOException {
        return imagen.getInputStream();
    }

    public long getSize() {
        return imagen.getSize();
    }

    public String getOriginalFilename() {
        return imagen.getSubmittedFileName();
    }

    public Imagen() {
    }

    public Imagen(Integer id, String imageUrl, Producto producto, Categoria categoria) {
        this.image_id = id;
        this.url = imageUrl;
        this.producto = producto;
        this.categoria = categoria;
    }
}
