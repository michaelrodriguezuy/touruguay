    package com.dh.toururuguay.controller.secure;

    import com.dh.toururuguay.dto.CategoriaDTO;
    import com.dh.toururuguay.model.Categoria;
    import com.dh.toururuguay.service.CategoriaService;

    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;
    import java.util.Optional;

    @RestController
    @CrossOrigin
    @RequestMapping("/categoria")
    public class CategoriaController {

        private static final Logger log = LoggerFactory.getLogger(CategoriaController.class);

        @Autowired
        private CategoriaService categoriaService;

        @PostMapping
        public ResponseEntity<Categoria> registrarCategoria(@RequestBody Categoria categoria) {
            Categoria categoriaGuardada = categoriaService.registrarCategoria(categoria);
            if (categoriaGuardada != null) {
                return ResponseEntity.ok(categoriaGuardada);
            } else {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null); // 409
            }
        }

        @GetMapping("/todasSinDTO")
        public ResponseEntity<List<Categoria>> buscarTodas() {
            return ResponseEntity.ok(categoriaService.buscarTodasSinDTO());
        }

        @GetMapping("/todas")
        public ResponseEntity<List<CategoriaDTO>> buscarTodasDTO() {
            List<CategoriaDTO> categorias = categoriaService.buscarTodasDTO();
            return ResponseEntity.ok(categorias);
        }

        @GetMapping("/{id}")
        public ResponseEntity<CategoriaDTO> buscarCategoria(@PathVariable Integer id) {
            CategoriaDTO categoriaDTO = categoriaService.buscarCategoria(id).orElse(null);
            return ResponseEntity.ok(categoriaDTO);
        }

        @PutMapping("/{id}")
        public ResponseEntity<Categoria> actualizar(@PathVariable Integer id,
        @RequestBody Categoria categoria,
        @RequestParam(name = "eliminarImagenes", defaultValue = "false") boolean eliminarImagenes) {

            log.info("Actualizando categoria", categoria);

            ResponseEntity<Categoria> response = null;

            if (categoria.getCategory_id() != null
                    && categoriaService.buscarCategoria(categoria.getCategory_id()).isPresent()) {

                log.info("Categoria encontrada");

                response = ResponseEntity.ok(categoriaService.actualizar(categoria));

                log.info("Categoria actualizada");
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                log.info("Categoria no encontrada");
            }
            return response;
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<String> eliminar(@PathVariable Integer id,
                @RequestParam(name = "eliminarImagenes", defaultValue = "false") boolean eliminarImagenes) {
            ResponseEntity<String> response = null;

            if (categoriaService.buscarCategoria(id).isPresent()) {

                categoriaService.eliminar(id, eliminarImagenes);
                response = ResponseEntity.status(HttpStatus.NO_CONTENT).body("Eliminada");
                log.info("Categoria eliminada");
            } else {
                response = ResponseEntity.status(HttpStatus.NOT_FOUND).build();
                log.info("Categoria no encontrada");
            }

            return response;
        }
    }
