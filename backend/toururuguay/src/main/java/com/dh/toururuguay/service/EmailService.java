package com.dh.toururuguay.service;

import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    private static final Logger log = LoggerFactory.getLogger(EmailService.class);

    private final String remitente;

    @Autowired
    public EmailService(JavaMailSender javaMailSender, @Value("${spring.mail.username}") String remitente, @Value("${spring.mail.password}") String passwordRemitente) {

        log.info("Valor de remitente: {}", remitente);
        log.info("Valor de passwordRemitente: {}", passwordRemitente);

        this.javaMailSender = javaMailSender;
        this.remitente = remitente;
    }

    public void enviarCorreoRegistro(String destinatario, String nombre, String apellido) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        log.info("Enviando correo a la dirección: {}", destinatario);

        try {
            helper.setFrom(remitente);
            helper.setTo(destinatario);
            helper.setSubject("Bienvenido a TOURuruguay");

            String cuerpoCorreo = "Hola " + nombre + " " + apellido
                    + ",\ngracias por registrarte en nuestra aplicación.";
            cuerpoCorreo += "\n\nPuedes iniciar sesión con tu correo electrónico " + destinatario
                    + " y la contraseña que proporcionaste en el siguiente enlace:\n" +
                    "<strong><a href='http://1023c12-grupo2.s3-website-us-east-1.amazonaws.com'>Iniciar Sesión</a></strong>";

            helper.setText(cuerpoCorreo, true);

            // Enviar el correo
            javaMailSender.send(message);
            log.info("Correo enviado a " + destinatario);
        } catch (MessagingException e) {

            log.error("Error al enviar correo a " + destinatario + ": " + e.getMessage(), e);


        }
    }
}
