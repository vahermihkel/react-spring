package ee.mihkel.webshop_backend.repository;

import ee.mihkel.webshop_backend.entity.Product;
import ee.mihkel.webshop_backend.entity.Shop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShopRepository extends JpaRepository<Shop, Long> {
}
