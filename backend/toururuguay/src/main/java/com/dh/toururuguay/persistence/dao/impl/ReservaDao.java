package com.dh.toururuguay.persistence.dao.impl;

import com.dh.toururuguay.dto.ProductDetailDTO;
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

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservaDao implements IDao<Reserva> {

    @PersistenceContext
    private EntityManager entityManager;

    private static final Logger log = LoggerFactory.getLogger(ReservaDao.class);

    @Transactional
    @Override
    public Reserva guardar(Reserva reserva) {
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
