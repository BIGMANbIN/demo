package com.example.mian.dao;

import com.amaz.core.orm.springjpa.CustomRepository;
import com.example.mian.entity.Customer;

import javax.inject.Named;

@Named
public interface CustomerDao extends CustomRepository<Customer,Long> {
}
