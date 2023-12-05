package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.dto.ProductDetailDTO;
import com.dh.toururuguay.dto.ProductHomeDTO;
import com.dh.toururuguay.dto.ReservaDTO;
import com.dh.toururuguay.model.Imagen;
import com.dh.toururuguay.model.Producto;
import com.dh.toururuguay.model.Reserva;
import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.persistence.dao.IDao;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
public class ReservaDao implements IDao<Reserva> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(ReservaDao.class);

    @Transactional
    @Override
    public Reserva guardar(Reserva reserva) {
        // antes de registrar la reserva, debo chequear las fechas del producto, y del
        // usuario
        entityManager.persist(reserva);
        log.info("Reserva guardada con éxito");
        return reserva;
    }

    @Transactional
    public ReservaDTO registrarReservaDTO(ReservaDTO reserva) {
        entityManager.persist(reserva);
        log.info("Reserva guardada con éxito");
        return reserva;
    }

    @Override
    public Optional<Reserva> buscar(Integer id) {
        try {
            Reserva reserva = entityManager.createQuery(
                    "SELECT r FROM Reserva r WHERE r.booking_id = :bookId\n", Reserva.class)
                    .setParameter("bookId", id)
                    .getSingleResult();

            return Optional.ofNullable(reserva);

        } catch (NoResultException e) {
            return Optional.empty();

        } catch (Exception e) {
            e.printStackTrace();
            return Optional.empty();
        }
    }

    @Transactional
    public Optional<ReservaDTO> buscarReserva(Integer id) {
        try {
            List<Object[]> results = entityManager.createQuery(
                    "SELECT r, u, p " +
                            "FROM Reserva r " +
                            "LEFT JOIN FETCH r.user u " +
                            "LEFT JOIN FETCH r.product p " +
                            "WHERE r.booking_id = :bookId",
                    Object[].class)
                    .setParameter("bookId", id)
                    .getResultList();

            ReservaDTO reservaDTO = new ReservaDTO();
            if (!results.isEmpty()) {

                results.forEach(result -> {
                    Reserva reserva = (Reserva) result[0];
                    Usuario usuario = (Usuario) result[1];
                    Producto producto = (Producto) result[2];

                    reservaDTO.setBooking_id(reserva.getBooking_id());
                    reservaDTO.setTitle(reserva.getTitle());
                    reservaDTO.setDescription(reserva.getDescription());
                    reservaDTO.setUser(usuario.getName());
                    reservaDTO.setProduct(producto.getProduct_name());
                    reservaDTO.setCity(producto.getCity().getCity_name());
                    reservaDTO.setDesde(reserva.getDesde());
                    reservaDTO.setHasta(reserva.getHasta());
                });
            }

            return Optional.of(reservaDTO);

        } catch (NoResultException e) {
            return Optional.empty();

        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al buscar el detalle de la reserva", e);
            return Optional.empty();
        }
    }

    // devuelve una lista de fechas reservadas de un producto
    @Transactional
    public List<String> devuelveFechasReservadasDelProducto(Integer id) {
        try {
            List<ReservaDTO> reservas = buscarReservasPorProducto(id);
            
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

            log.info("Se encontraron " + reservas.size() + " reservas");

            List<String> resultado = reservas.stream()
                    .map(reserva -> {
                        String fechaDesde = format.format(reserva.getDesde());
                        String fechaHasta = format.format(reserva.getHasta());
                        return fechaDesde + " - " + fechaHasta;
                    })
                    .collect(Collectors.toList());

            return resultado;

        } catch (NoResultException e) {
            return Collections.emptyList();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al buscar las fechas reservadas del producto", e);
            return Collections.emptyList();
        }
    }

    @Transactional
    public List<ReservaDTO> buscarReservasPorProducto(Integer id) {
        try {
            List<Object[]> results = entityManager.createQuery(
                    "SELECT r, u, p " +
                            "FROM Reserva r " +
                            "LEFT JOIN FETCH r.user u " +
                            "LEFT JOIN FETCH r.product p " +
                            "WHERE p.product_id = :productId",
                    Object[].class)
                    .setParameter("productId", id)
                    .getResultList();

            List<ReservaDTO> reservasDTO = new ArrayList<>();

            if (!results.isEmpty()) {
                results.forEach(result -> {
                    Reserva reserva = (Reserva) result[0];
                    Usuario usuario = (Usuario) result[1];
                    Producto producto = (Producto) result[2];

                    ReservaDTO reservaDTO = new ReservaDTO();

                    reservaDTO.setBooking_id(reserva.getBooking_id());
                    reservaDTO.setTitle(reserva.getTitle());
                    reservaDTO.setDescription(reserva.getDescription());
                    reservaDTO.setUser(usuario.getName());
                    reservaDTO.setProduct(producto.getProduct_name());
                    reservaDTO.setCity(producto.getCity().getCity_name());
                    reservaDTO.setDesde(reserva.getDesde());
                    reservaDTO.setHasta(reserva.getHasta());
                    reservasDTO.add(reservaDTO);
                });
            }
            return reservasDTO;
        } catch (NoResultException e) {
            return Collections.emptyList();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al buscar las reservas del producto", e);
            return Collections.emptyList();
        }
    }

    // devuelveProductosDisponiblesEnRangoDeFechas
    @Transactional
    public List<ProductHomeDTO> devuelveProductosDisponiblesEnRangoDeFechas(Date desde, Date hasta) {
        try {
            List<ProductHomeDTO> productosDTO = new ArrayList<>();

            List<Producto> productos = entityManager.createQuery(
                    "SELECT DISTINCT p " +
                            "FROM Producto p " +
                            "WHERE p.product_id NOT IN (" +
                            "   SELECT r.product.product_id " +
                            "   FROM Reserva r " +
                            "   WHERE (r.desde BETWEEN :desde AND :hasta) OR (r.hasta BETWEEN :desde AND :hasta)" +
                            "   OR (r.desde < :desde AND r.hasta > :hasta)" +
                            ")",
                    Producto.class)
                    .setParameter("desde", desde)
                    .setParameter("hasta", hasta)
                    .getResultList();

            for (Producto producto : productos) {
                Imagen imagen = entityManager.createQuery(
                        "SELECT i " +
                                "FROM Imagen i " +
                                "WHERE i.producto = :producto",
                        Imagen.class)
                        .setParameter("producto", producto)
                        .setMaxResults(1) // me traigo 1 sola imagen
                        .getResultList()
                        .stream()
                        .findFirst()
                        .orElse(null);

                ProductHomeDTO productoDTO = new ProductHomeDTO();
                productoDTO.setProduct_id(producto.getProduct_id());
                productoDTO.setProduct_name(producto.getProduct_name());
                productoDTO.setPrice(producto.getPrice());
                productoDTO.setCity(producto.getCity().getCity_name());
                productoDTO.setUrlImagen(imagen != null ? imagen.getImageUrl() : null);

                productosDTO.add(productoDTO);
            }

            return productosDTO;
        } catch (NoResultException e) {
            return Collections.emptyList();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al buscar los productos disponibles en el rango de fechas", e);
            return Collections.emptyList();
        }
    }

    @Transactional
    public List<ProductHomeDTO> buscarProductosPorTexto(String texto) {
        try {
            List<Producto> productos = entityManager.createQuery(
                    "SELECT DISTINCT p " +
                            "FROM Producto p " +
                            "WHERE p.product_name LIKE :texto OR p.description LIKE :texto",
                    Producto.class)
                    .setParameter("texto", "%" + texto + "%")
                    .getResultList();

            List<ProductHomeDTO> productosDTO = new ArrayList<>();

            if (!productos.isEmpty()) {
                log.info("Se encontraron " + productos.size() + " productos");

                productos.forEach(result -> {

                    ProductHomeDTO productoDTO = new ProductHomeDTO();

                    productoDTO.setProduct_id(result.getProduct_id());
                    productoDTO.setProduct_name(result.getProduct_name());
                    productoDTO.setPrice(result.getPrice());
                    productoDTO.setCity(result.getCity().getCity_name());

                    List<Imagen> imagenes = entityManager.createQuery(
                            "SELECT i " +
                                    "FROM Imagen i " +
                                    "WHERE i.producto = :producto",
                            Imagen.class)
                            .setParameter("producto", result)
                            .getResultList();

                    Imagen primeraImagen = !imagenes.isEmpty() ? imagenes.get(0) : null;
                    productoDTO.setUrlImagen(primeraImagen != null ? primeraImagen.getImageUrl() : null);

                    productosDTO.add(productoDTO);
                });
            }
            return productosDTO;
        } catch (NoResultException e) {
            return Collections.emptyList();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al buscar los productos que cumplan con el criterio de busqueda", e);
            return Collections.emptyList();
        }
    }

    @Transactional
    public List<ReservaDTO> buscarReservasPorUsuario(Integer id) {
        try {
            List<Object[]> results = entityManager.createQuery(
                    "SELECT r, u, p " +
                            "FROM Reserva r " +
                            "LEFT JOIN FETCH r.user u " +
                            "LEFT JOIN FETCH r.product p " +
                            "WHERE u.user_id = :userId",
                    Object[].class)
                    .setParameter("userId", id)
                    .getResultList();

            List<ReservaDTO> reservasDTO = new ArrayList<>();

            if (!results.isEmpty()) {
                results.forEach(result -> {
                    Reserva reserva = (Reserva) result[0];
                    Usuario usuario = (Usuario) result[1];
                    Producto producto = (Producto) result[2];

                    ReservaDTO reservaDTO = new ReservaDTO();

                    reservaDTO.setBooking_id(reserva.getBooking_id());
                    reservaDTO.setTitle(reserva.getTitle());
                    reservaDTO.setDescription(reserva.getDescription());
                    reservaDTO.setUser(usuario.getName());
                    reservaDTO.setProduct(producto.getProduct_name());
                    reservaDTO.setCity(producto.getCity().getCity_name());
                    reservaDTO.setDesde(reserva.getDesde());
                    reservaDTO.setHasta(reserva.getHasta());
                    reservasDTO.add(reservaDTO);
                });
            }
            return reservasDTO;
        } catch (NoResultException e) {
            return Collections.emptyList();
        } catch (Exception e) {
            e.printStackTrace();
            log.error("Error al buscar las reservas del producto", e);
            return Collections.emptyList();
        }
    }

    @Override
    public void eliminar(Integer id) {

    }

    @Override
    public List<Reserva> buscarTodos() {
        try {
            return entityManager.createQuery(
                    "SELECT r FROM Reserva r ", Reserva.class)
                    .getResultList();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public Reserva actualizar(Reserva reserva) {
        return null;
    }
}
