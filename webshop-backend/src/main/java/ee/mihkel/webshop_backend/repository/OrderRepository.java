package ee.mihkel.webshop_backend.repository;

import ee.mihkel.webshop_backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {


    List<Order> findByPerson_Email(String email);
}
