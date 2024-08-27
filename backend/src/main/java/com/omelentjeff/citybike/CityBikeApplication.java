package com.omelentjeff.citybike;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CityBikeApplication {

	public static void main(String[] args) {
		// Load the .env file using an absolute path
		Dotenv dotenv = Dotenv.configure()
				.directory("/Users/omelettechef/Helsinki_City_Bike/helsinki-city-bike/backend")
				.filename(".env")
				.load();

		// Set environment variables
		System.setProperty("DB_URL", dotenv.get("DB_URL"));
		System.setProperty("DB_USERNAME", dotenv.get("DB_USERNAME"));
		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));


		SpringApplication.run(CityBikeApplication.class, args);
	}

}
