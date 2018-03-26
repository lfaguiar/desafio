package com.desafio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class DesafioConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(DesafioConfigServerApplication.class, args);
	}
}