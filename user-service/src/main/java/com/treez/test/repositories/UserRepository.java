package com.treez.test.repositories;

import com.treez.test.models.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
@Transactional
public interface UserRepository extends PagingAndSortingRepository<User, Integer> {

    @EntityGraph(attributePaths = {"addresses"})
    Optional<User> findById(Integer id);
}
