package com.yazanalmatar.projectframe.repositories;


import com.yazanalmatar.projectframe.domain.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByUsername(String username);

    User getById(Long id);

}
