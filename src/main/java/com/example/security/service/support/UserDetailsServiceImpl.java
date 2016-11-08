//package com.example.security.service.support;//package com.amaz.main.security.service.impl;
//
//import com.example.security.entity.User;
//import com.google.common.collect.Sets;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.Set;
//
///**
// * 实现SpringSecurity的UserDetailsService接口,实现获取用户Detail信息的回调函数.
// *
// * @author calvin
// */
//@Transactional(readOnly = true)
//public class UserDetailsServiceImpl implements UserDetailsService {
//
//    private AccountManager accountManager;
//
//    /**
//     * 获取用户Details信息的回调函数.
//     */
//    public UserDetails loadUserByUsername(String username)  {
//        User user = accountManager.findUserByLoginName(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("用户" + username + " 不存在");
//        }
//
//        Set<GrantedAuthority> grantedAuths = obtainGrantedAuthorities(user);
//
//        boolean enabled = true;
//        boolean accountNonExpired = true;
//        boolean credentialsNonExpired = true;
//        boolean accountNonLocked = true;
//
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getLoginName(), user.getPassword(), enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, grantedAuths);
//    }
//
//    /**
//     * 获得用户所有角色的权限集合.
//     */
//    private Set<GrantedAuthority> obtainGrantedAuthorities(User user) {
//        Set<GrantedAuthority> authSet = Sets.newHashSet();
//        for (Role role : user.getRoleList()) {
//            for (Authority authority : role.getAuthorityList()) {
//                authSet.add(new SimpleGrantedAuthority(authority.getPrefixedName()));
//            }
//        }
//        return authSet;
//    }
//    @Autowired
//    public void setAccountManager(AccountManager accountManager) {
//        this.accountManager = accountManager;
//    }
//}