package com.example.web.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/security/login")
public class LoginController {

    @RequestMapping
    public String login () {
        return "security/login";
    }
}
