package com.dh.toururuguay.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.servlet.http.Part;

import java.io.IOException;
import java.io.InputStream;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "image")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Imagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer image_id;
    private String url;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Producto producto;

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

    public Imagen(Integer id, String imageUrl, Producto producto) {
        this.image_id = id;
        this.url = imageUrl;
        this.producto = producto;
    }
}
