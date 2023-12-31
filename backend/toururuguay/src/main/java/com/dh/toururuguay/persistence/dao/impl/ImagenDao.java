package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.model.Imagen;
import com.dh.toururuguay.model.Producto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetUrlRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Repository
@Transactional
public class ImagenDao {
    @PersistenceContext
    private EntityManager entityManager;

    private final Logger log = LoggerFactory.getLogger(ImagenDao.class);

    private final String BUCKET_NAME = "1023c12-grupo2-img";
    static List<String> urlsImagenes = new ArrayList<>();

    public void guardarImagenesDelProducto(Producto producto) {
        try {
            // Recorrer la lista de URLs y guardar cada imagen asociada al producto
            if (urlsImagenes.size() > 0) {
                for (String urlImagen : urlsImagenes) {
                    Imagen imagen = new Imagen();
                    imagen.setImageUrl(urlImagen);
                    imagen.setProducto(producto); // Asociar la imagen al producto
                    entityManager.persist(imagen);
                }
                urlsImagenes.clear();
            }
            log.info("Imágenes guardadas con éxito en la base de datos");
        } catch (Exception e) {
            log.error("Error al guardar las imágenes del producto", e);
        }
    }

    // Este método sube la imagen a S3 y devuelve la URL
    public boolean subirImagenS3(MultipartFile imagen) {
        try {
            S3Client s3Client = S3Client.builder().build();
            String nombreImagen = generarNombreUnico();
            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(nombreImagen)
                    .contentType(imagen.getContentType())
                    .contentDisposition("inline")
                    .build();
            s3Client.putObject(putObjectRequest,
                    RequestBody.fromInputStream(imagen.getInputStream(), imagen.getSize()));

            urlsImagenes.add(s3Client.utilities()
                    .getUrl(GetUrlRequest.builder().bucket(BUCKET_NAME).key(nombreImagen).build()).toString());
            log.info("Imagenes subidas con éxito al bucket S3");
            return true;
        } catch (Exception e) {
            log.error("Error al subir la imagen a S3", e);
            throw new RuntimeException("Error al subir la imagen a S3", e);
        }
    }

    private String generarNombreUnico() {
        return UUID.randomUUID().toString() + ".jpg";
    }

    public List<Imagen> buscarTodos() {
        try {
            return entityManager.createQuery(
                    "SELECT i FROM Imagen i LEFT JOIN FETCH i.producto", Imagen.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    public void eliminarImagenesDelProducto(Producto producto) {
        try {

            List<Imagen> imagenes = entityManager.createQuery(
                    "SELECT i FROM Imagen i WHERE i.producto.product_id = :productoId", Imagen.class)
                    .setParameter("productoId", producto.getProduct_id())
                    .getResultList();

            for (Imagen imagen : imagenes) {
                eliminarImagenS3(imagen.getImageUrl());
            }

            entityManager.createQuery("DELETE FROM Imagen i WHERE i.producto.product_id = :productoId")
                    .setParameter("productoId", producto.getProduct_id())
                    .executeUpdate();
            log.info("Imagenes eliminadas con éxito de la base de datos ");
        } catch (Exception e) {
            log.error("Error al eliminar las imágenes del producto", e);
        }
    }

    // tambien quiero eliminar las imagenes de mi bucket S3
    private void eliminarImagenS3(String imageUrl) {
        try {
            S3Client s3Client = S3Client.builder().region(Region.US_EAST_1).build();
            String key = obtenerNombreKeyDesdeUrl(imageUrl);

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(BUCKET_NAME)
                    .key(key)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);
            log.info("Imagenes eliminadas con éxito del bucket S3");
        } catch (Exception e) {
            log.error("Error al eliminar la imagen del bucket S3", e);
        }
    }

    private String obtenerNombreKeyDesdeUrl(String imageUrl) {

        String[] partesUrl = imageUrl.split("/");
        return partesUrl[partesUrl.length - 1];
    }

}
