package com.desafio.controller;

import java.security.Principal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class AuthController {

    @RequestMapping("/userAuth")
    public Principal getCurrentLoggedInUser(Principal user) {
        return user;
    }
}
