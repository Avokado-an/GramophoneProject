package com.anton.gramophone.service.impl;

import com.anton.gramophone.entity.Role;
import com.anton.gramophone.entity.User;
import com.anton.gramophone.entity.dto.EditProfileDto;
import com.anton.gramophone.entity.dto.RegistrationDto;
import com.anton.gramophone.entity.dto.UserProfileDto;
import com.anton.gramophone.entity.dto.UserSearchDto;
import com.anton.gramophone.repository.UserRepository;
import com.anton.gramophone.service.UserService;
import com.anton.gramophone.service.specification.UserSpecification;
import com.anton.gramophone.validator.UserValidator;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImplementation implements UserService {
    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    private UserValidator userValidator;

    @Autowired
    public void setUserValidator(UserValidator userValidator) {
        this.userValidator = userValidator;
    }

    private PasswordEncoder encoder;

    @Autowired
    public void setEncoder(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @Override
    public boolean save(RegistrationDto profile) {
        boolean wasUserSaved = false;
        ModelMapper modelMapper = new ModelMapper();
        if (userValidator.validateUserRegistrationData(profile)) {
            if (userRepository.findUserByEmail(profile.getEmail()) == null) {
                profile.setPassword(encoder.encode(profile.getPassword()));
                User user = modelMapper.map(profile, User.class);
                user.setRoles(new HashSet<>(Collections.singletonList(Role.USER)));
                userRepository.save(user);
                wasUserSaved = true;
            }
        }
        return wasUserSaved;
    }

    @Override
    public Optional<User> findById(String id) {
        Optional<User> user;
        try {
            Long idNumber = Long.parseLong(id);
            user = userRepository.findById(idNumber);
        } catch (NumberFormatException e) {
            user = Optional.empty();
        }
        return user;
    }

    @Override
    public User loadUserByUsername(String email) {
        return userRepository.findUserByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserProfileDto> findAll() {
        List<User> users = userRepository.findAll();
        ModelMapper modelMapper = new ModelMapper();
        return users.stream().map(u -> modelMapper.map(u, UserProfileDto.class)).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserProfileDto> filterUsers(UserSearchDto userSearchDTO) {
        List<User> users = userRepository.findAll(Specification
                .where(UserSpecification.firstNameStartsWith(userSearchDTO.getFirstName()))
                .and(UserSpecification.lastNameStartsWith(userSearchDTO.getLastName()))
                .and(UserSpecification.userInstrumentsContain(
                        userSearchDTO.getInstrumentName(), userSearchDTO.getSkillLevel())));
        ModelMapper modelMapper = new ModelMapper();
        return users.stream().map(u -> modelMapper.map(u, UserProfileDto.class)).collect(Collectors.toList());
    }

    @Override
    @Transactional
    public UserProfileDto updateUser(String email, EditProfileDto profile) {
        ModelMapper modelMapper = new ModelMapper();
        User user = userRepository.findUserByEmail(email);
        user.setFirstName(profile.getFirstName());
        user.setLastName(profile.getLastName());
        user.setGender(profile.getGender());
        user.setStatus(profile.getStatus());
        user.setProfilePicture(profile.getProfilePicture());
        userRepository.save(user);
        return modelMapper.map(user, UserProfileDto.class);
    }

    @Override
    @Transactional
    public void subscribe(User currentUser, String idForSubscription) {
        try {
            Long subId = Long.parseLong(idForSubscription);
            Optional<User> userToSubscribeTo = userRepository.findById(subId);
            if (userToSubscribeTo.isPresent()) {
                currentUser.addSubscription(userToSubscribeTo.get());
                userToSubscribeTo.get().addSubscriber(currentUser);
                userRepository.save(currentUser);
                userRepository.save(userToSubscribeTo.get());
            }
        } catch (NumberFormatException ignored) {

        }
    }

    @Override
    public void unsubscribe(User currentUser, String idForSubscription) {
        try {
            Long subId = Long.parseLong(idForSubscription);
            Optional<User> userToSubscribeTo = userRepository.findById(subId);
            if (userToSubscribeTo.isPresent()) {
                currentUser.removeSubscription(userToSubscribeTo.get());
                userToSubscribeTo.get().removeSubscriber(currentUser);
                userRepository.save(currentUser);
                userRepository.save(userToSubscribeTo.get());
            }
        } catch (NumberFormatException ignored) {
        }
    }
}
