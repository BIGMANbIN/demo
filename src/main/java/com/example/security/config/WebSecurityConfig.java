//package com.example.security.config;
//
//
//import com.example.security.service.impl.AuthenticationSuccessHandlerImpl;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.authentication.dao.ReflectionSaltSource;
//import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.builders.WebSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//import org.springframework.security.core.userdetails.UserDetailsService;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        // 设置不拦截规则
//        web.ignoring().antMatchers("/assets/**", "/", "/channel/**", "/chat/**", "/ac/**", "/article/**", "/customer/**", "/jgc/**");
//    }
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
//        http
//                //.csrf().disable()//取消csrf验证
//                .authorizeRequests()//
//                .antMatchers("/admin/**", "/security/**").authenticated()//
//                .and()//
//                .formLogin().loginPage("/security/login").successHandler(new AuthenticationSuccessHandlerImpl()).permitAll()
//                .and().logout().logoutUrl("/security/logout").logoutSuccessUrl("/security/login");
//
//    }
//
//    @Override
//    protected void configure(AuthenticationManagerBuilder auth)
//            throws Exception {
//        // auth.userDetailsService(new UserDetailsServiceImpl()).passwordEncoder(new Md5PasswordEncoder());
//        // 自定义UserDetailsService
//
//        //  auth.userDetailsService(userDetailsService()).passwordEncoder(new Md5PasswordEncoder());
//        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
//        authProvider.setPasswordEncoder(new Md5PasswordEncoder());
//        authProvider.setUserDetailsService(userDetailsService());
//        ReflectionSaltSource saltSource = new ReflectionSaltSource();
//        saltSource.setUserPropertyToUse("username");
//        authProvider.setSaltSource(saltSource);
//        auth.authenticationProvider(authProvider);
//    }
//
////    @Bean
////    public UserDetailsService userDetailsService() {
////        UserDetailsServiceImpl userDetailsServiceImpl = new UserDetailsServiceImpl();
////        return userDetailsServiceImpl;
////    }
//
//}
