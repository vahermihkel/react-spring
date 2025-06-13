package ee.mihkel.webshop_backend.repository;

import ee.mihkel.webshop_backend.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByEmail(String email);
}