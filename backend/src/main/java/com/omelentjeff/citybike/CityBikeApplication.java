package com.omelentjeff.citybike;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CityBikeApplication {

	public static void main(String[] args) {
		SpringApplication.run(CityBikeApplication.class, args);
	}

}
