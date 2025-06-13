package ee.mihkel.webshop_backend.repository;

import ee.mihkel.webshop_backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// CrudRepository ---> kõige vähem funktsioon
// PagingAndSortingRepository ---> pagineerimine, sorteerimine
// JpaRepository ---> kõige võimsam, kõige rohkem funktsioone
public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByOrderByIdAsc();
}
