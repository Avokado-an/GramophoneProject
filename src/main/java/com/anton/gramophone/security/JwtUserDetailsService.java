package com.anton.gramophone.security;

import com.anton.gramophone.entity.User;
import com.anton.gramophone.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class JwtUserDetailsService implements UserDetailsService {
    private UserService userService;

    @Autowired
    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String s) {
        User user = userService.loadUserByUsername(s);
        if (user == null) {
            throw new UsernameNotFoundException("username " + s + " is not present");
        }
        return JwtUserFactory.create(user);
    }
}
