package com.example.web.admin;


import com.example.mian.service.CustomerService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.inject.Inject;

@Controller
@RequestMapping("/admin/customer")
public class CustomerController {

    @Inject
    private CustomerService customerService;

    @RequestMapping
    public String index () {
        return "admin/customer/index";
    }
}
