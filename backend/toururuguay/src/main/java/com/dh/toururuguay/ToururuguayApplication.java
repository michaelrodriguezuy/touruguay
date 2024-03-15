package com.dh.toururuguay;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.HashMap;
import java.util.Map;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class ToururuguayApplication {

    public static void main(String[] args) {

        // Cargar las variables de entorno del archivo .env para el entorno local
        // Dotenv dotenv = Dotenv.configure().load(); 
       

        SpringApplication app = new SpringApplication(ToururuguayApplication.class);

        /*  Map<String, Object> defaultProperties = new HashMap<>();
        defaultProperties.put("spring.datasource.url",
                "jdbc:mysql://" + dotenv.get("DB_HOST") + ":" + dotenv.get("DB_PORT") + "/" + dotenv.get("DB_NAME"));
        defaultProperties.put("spring.datasource.username", dotenv.get("DB_USERNAME"));
        defaultProperties.put("spring.datasource.password", dotenv.get("DB_PASSWORD"));
        app.setDefaultProperties(defaultProperties); */

        app.run(args);
    }
}
