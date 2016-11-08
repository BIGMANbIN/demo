package com.example.security.dao;

import com.amaz.core.orm.springjpa.CustomRepository;
import com.example.security.entity.User;

import javax.inject.Named;

@Named
public interface UserDao extends CustomRepository<User, Long> {
}
