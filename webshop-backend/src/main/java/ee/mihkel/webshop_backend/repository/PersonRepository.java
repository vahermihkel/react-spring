package ee.mihkel.webshop_backend.repository;

import ee.mihkel.webshop_backend.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByEmail(String email);

    @Query("SELECT p FROM Person p WHERE " +
            "LOWER(p.email) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(p.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(p.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Person> searchByTerm(@Param("searchTerm") String searchTerm);

}