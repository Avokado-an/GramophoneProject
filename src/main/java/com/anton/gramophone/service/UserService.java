package com.anton.gramophone.service;

import com.anton.gramophone.entity.User;
import com.anton.gramophone.entity.dto.EditProfileDto;
import com.anton.gramophone.entity.dto.RegistrationDto;
import com.anton.gramophone.entity.dto.UserSearchDto;
import com.anton.gramophone.entity.dto.UserProfileDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService extends UserDetailsService {
    boolean save(RegistrationDto profile);

    Optional<User> findById(String id);

    List<UserProfileDto> findAll();

    List<UserProfileDto> filterUsers(UserSearchDto userSearchDTO);

    UserProfileDto updateUser(String email, EditProfileDto profile);

    User loadUserByUsername(String s);

    void subscribe(User currentUser, String idForSubscription);

    void unsubscribe(User currentUser, String idForSubscription);
}
