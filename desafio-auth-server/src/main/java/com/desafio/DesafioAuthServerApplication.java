package com.desafio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class DesafioAuthServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DesafioAuthServerApplication.class, args);
	}
}