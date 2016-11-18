package com.example.web.admin;


import com.amaz.core.orm.domain.Page;
import com.example.mian.entity.Customer;
import com.example.mian.service.CustomerService;
import com.example.web.util.DataTablesResult;
import com.example.web.util.Status;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/admin/customer")
public class CustomerController {

    @Inject
    private CustomerService customerService;

    @RequestMapping
    public String index() {
        return "admin/customer/index";
    }


    @RequestMapping(value = "list", method = RequestMethod.GET)
    public DataTablesResult<Customer> list(HttpServletRequest request) {
        List<Customer> customerList = customerService.find();
        String draw = request.getParameter("draw");
        Integer start = Integer.valueOf(request.getParameter("start"));
        Integer length = Integer.valueOf(request.getParameter("length"));
        Page<Customer> page = new Page<>(length);
        page.setPageNo(start / length + 1);
        page.setTotalCount(customerList.size());
        page = customerService.page(page);

        return new DataTablesResult<>(draw, page.getResult(), page.getTotalCount(), page.getTotalCount());
    }

    @RequestMapping(value = "/new", method = RequestMethod.GET)
    public String _new() {
        return "admin/customer/new";
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public String create(Customer customer) {
        customer.setStatus(Status.NORMAL.getValue());
        Customer customer1 = customerService.getByUserName(customer.getUserName());
        if (customer1 != null) {
            return "此账号已存在";
        } else {
            customerService.save(customer);
            return "create";
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable Long id) {
        Customer customer = customerService.get(id);
        customerService.delete(customer);
        return "delete";
    }

    @RequestMapping(value = "/{id}/edit", method = RequestMethod.GET)
    public String edit(@PathVariable Long id,Model model) {
        Customer customer = customerService.get(id);
        model.addAttribute("customer", customer);
        return "admin/customer/edit";
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    public String update(@PathVariable Long id, HttpServletRequest request) {
        Customer customer = customerService.get(id);
        String userName = request.getParameter("userName");
        Customer customer1 = customerService.getByUserName(userName);
        if (customer1 != null) {
            if (userName.equals(customer.getUserName())) {
                ServletRequestDataBinder binder = new ServletRequestDataBinder(customer);
                binder.bind(request);
                customerService.save(customer);
            } else {
                String name = customer1.getUserName();
                if (name.equals(userName)) {
                    return "此账号已存在";
                }
            }
        } else {
            ServletRequestDataBinder binder = new ServletRequestDataBinder(customer);
            binder.bind(request);
            customerService.save(customer);
        }
        return "update";
    }

    @RequestMapping(value = "/{id}/status",method = RequestMethod.PUT)
    public String updateStatus(@PathVariable Long id, Model model) {
        Customer customer = customerService.get(id);
        model.addAttribute("customer",customer);
        customer.setStatus(customer.getStatus() == 1 ? 0:1);
        customerService.save(customer);
        return "update";
    }

}
