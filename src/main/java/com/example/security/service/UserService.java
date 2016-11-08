package com.example.security.service;

import com.amaz.core.orm.springjpa.CustomRepository;
import com.amaz.core.service.BaseService;
import com.example.security.dao.UserDao;
import com.example.security.entity.User;

import javax.inject.Inject;
import javax.inject.Named;

@Named
public class UserService extends BaseService<User,Long> {

    @Inject
    private UserDao userDao;


    @Override
    protected CustomRepository<User, Long> getEntityRepository() {
        return userDao;
    }
}
