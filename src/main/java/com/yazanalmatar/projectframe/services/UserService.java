package com.yazanalmatar.projectframe.services;

import com.yazanalmatar.projectframe.domain.User;
import com.yazanalmatar.projectframe.exceptions.UsernameAlreadyExistsException;
import com.yazanalmatar.projectframe.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setUsername(newUser.getUsername());
            //Username has to be unique (Exception)

            //Make sure that password and confirmedPassword match

            //We don't persist or show the confirmedPassword
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username " + newUser.getUsername() + " already exists");
        }


    }

}
