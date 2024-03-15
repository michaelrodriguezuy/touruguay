package com.dh.toururuguay;

<<<<<<< HEAD
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.HashMap;
import java.util.Map;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ToururuguayApplication {

    private static final Logger logger = LoggerFactory.getLogger(ToururuguayApplication.class);

    public static void main(String[] args) {
        // Imprimir las variables de entorno para depuración
        Map<String, String> env = System.getenv();
        for (String envName : env.keySet()) {
            logger.info("{}={}", envName, env.get(envName));
        }

        // Cargar las variables de entorno del archivo .env
        Dotenv dotenv = Dotenv.configure().load(); 
       

        // Configurar las propiedades por defecto de la aplicación
        SpringApplication app = new SpringApplication(ToururuguayApplication.class);
        Map<String, Object> defaultProperties = new HashMap<>();
        defaultProperties.put("spring.datasource.url",
                "jdbc:mysql://" + dotenv.get("DB_HOST") + ":" + dotenv.get("DB_PORT") + "/" + dotenv.get("DB_NAME"));
        defaultProperties.put("spring.datasource.username", dotenv.get("DB_USERNAME"));
        defaultProperties.put("spring.datasource.password", dotenv.get("DB_PASSWORD"));
        app.setDefaultProperties(defaultProperties);

        // Iniciar la aplicación Spring Boot
        app.run(args);
    }
=======


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication

public class ToururuguayApplication {

	public static void main(String[] args) {


		SpringApplication.run(ToururuguayApplication.class, args);
	}

>>>>>>> origin/Backend
}
