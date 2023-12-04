package com.dh.toururuguay.controller.secure;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dh.toururuguay.model.Usuario;
import com.dh.toururuguay.service.EmailService;

@RestController
@RequestMapping("/email")
public class EmailController {

    private static final Logger log = LoggerFactory.getLogger(EmailController.class);

    @Autowired
    private EmailService emailService;

    @PostMapping
    public void enviarCorreo(@RequestBody Usuario usuario) {
        log.info("Reenviando correo...");
        emailService.enviarCorreoRegistro(usuario.getUsername(), usuario.getName(), usuario.getLastname());
    }
}
