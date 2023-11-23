package com.dh.toururuguay;

import com.dh.toururuguay.persistence.dao.configuration.CorsConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import(CorsConfig.class)
public class ToururuguayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ToururuguayApplication.class, args);
	}

}
