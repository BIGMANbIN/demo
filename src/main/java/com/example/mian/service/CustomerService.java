package com.example.mian.service;

import com.amaz.core.orm.springjpa.CustomRepository;
import com.amaz.core.service.BaseService;
import com.example.mian.dao.CustomerDao;
import com.example.mian.entity.Customer;

import javax.inject.Inject;
import javax.inject.Named;
import java.util.Map;

@Named
public class CustomerService extends BaseService<Customer,Long> {

    @Inject private CustomerDao customerDao;

    @Override
    protected CustomRepository<Customer, Long> getEntityRepository() {
        return customerDao;
    }


    public Customer getByUserName(String userName) {
        return getBy("userName",userName);
    }
}
