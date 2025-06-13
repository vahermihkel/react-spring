package ee.mihkel.webshop_backend.repository;

import ee.mihkel.webshop_backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Category findByName(String name);
}
