package com.yazanalmatar.projectframe.services;

import com.yazanalmatar.projectframe.domain.User;
import com.yazanalmatar.projectframe.exceptions.UsernameAlreadyExistsException;
import com.yazanalmatar.projectframe.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username " + newUser.getUsername() + " already exists");
        }


    }

    public User updateUser(User updatedUser) {
        try {
            if (updatedUser.getId() == null) {
                throw new UsernameNotFoundException("User not found.");
            }
            Optional<User> user = userRepository.findById(updatedUser.getId());

            User user1 = user.get();
            if (updatedUser.getFullName() != null) {
                user1.setFullName(updatedUser.getFullName());
            }
            if (updatedUser.getUsername() != null) {
                user1.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getPosition() != null) {
                user1.setPosition(updatedUser.getPosition());
            }
            return userRepository.save(user1);
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
    }

    public User getUserById(Long id) {
        try {
            Optional<User> user = userRepository.findById(id);
            User user1 = user.get();
            user1.setPassword(null);
            user1.setProjects(null);
            if (user1 != null) {
                return user1;
            }
        } catch (Exception e) {
            throw new UsernameNotFoundException("User not found");
        }
        return null;
    }


}
