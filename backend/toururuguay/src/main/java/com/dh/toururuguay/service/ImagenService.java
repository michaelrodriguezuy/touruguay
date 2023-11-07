package com.dh.toururuguay.service;

import com.dh.toururuguay.dto.ImagenDTO;
import com.dh.toururuguay.model.Imagen;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.persistence.dao.IDao;
import com.dh.toururuguay.persistence.dao.impl.ImagenDao;
import com.dh.toururuguay.persistence.dao.impl.ProductoDao;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ImagenService {

    private static final Logger log = LoggerFactory.getLogger(ImagenService.class);
    private final ImagenDao imagenDao;

    @Autowired
    public ImagenService(ImagenDao imagenDao) {
        this.imagenDao = imagenDao;
    }

    public boolean subirImagenS3(List <MultipartFile> imagenes) {
        try {
            for (MultipartFile imagen : imagenes) {
                boolean subidaExitosa= imagenDao.subirImagenS3(imagen);
            }
            return true;
        }
        catch (Exception e){
            log.error("Error al procesar y guardar las imagenes", e);
            throw new RuntimeException("Error al procesar y guardar las imagenes", e);
        }
    }

    public void guardarImagenesDelProducto(Producto producto) {
        imagenDao.guardarImagenesDelProducto(producto);
    }

    public List<ImagenDTO> buscarTodos() {
        List<Imagen> imagenes = imagenDao.buscarTodos();
        return imagenes.stream()
                .map(this::convertirAImagenDTO)
                .collect(Collectors.toList());
    }

    private ImagenDTO convertirAImagenDTO(Imagen imagen) {
        ImagenDTO dto = new ImagenDTO();
        dto.setImageId(imagen.getId());
        dto.setUrl(imagen.getImageUrl());
        dto.setProducto(imagen.getProducto());
        // Puedes agregar más campos según sea necesario
        return dto;
    }
}
