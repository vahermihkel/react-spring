package ee.mihkel.webshop_backend.controller;

import ee.mihkel.webshop_backend.dto.ProductDTO;
import ee.mihkel.webshop_backend.entity.Category;
import ee.mihkel.webshop_backend.entity.Product;
import ee.mihkel.webshop_backend.repository.CategoryRepository;
import ee.mihkel.webshop_backend.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CategoryRepository categoryRepository;

    // localhost:8080/products
    @GetMapping("products")
    public List<Product> getProducts() {
        return productRepository.findByOrderByIdAsc(); // SELECT * FROM products
    }

    @PostMapping("products")
    public List<Product> addProduct(@RequestBody Product product) {
        if (product.getId() != null){
            throw new RuntimeException("Cannot add with ID");
        }
        productRepository.save(product); // INSERT VALUES INTO products
        return productRepository.findAll();
    }

    @DeleteMapping("products/{id}")
    public List<Product> deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id); // DELETE FROM products
        return productRepository.findAll();
    }

    @GetMapping("products/{id}")
    public Product getProduct(@PathVariable Long id) {
        return productRepository.findById(id).orElseThrow(); // SELECT * FROM products WHERE
    }

    @PutMapping("products")
    public List<Product> editProduct(@RequestBody Product product) {
        if (product.getId() == null || product.getId() <= 0){
            throw new RuntimeException("Cannot edit without ID");
        }
        productRepository.save(product); // INSERT VALUES INTO products
        return productRepository.findAll();
    }

    @PatchMapping("products/{id}")
    public List<Product> editProductActive(@PathVariable Long id) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setActive(!product.isActive());
        productRepository.save(product);
        return productRepository.findAll();
    }

    @PutMapping("all-products")
    public List<Product> editProduct(@RequestBody List<ProductDTO> products) {
        List<Product> productsWithCategory = new ArrayList<>();
        for (ProductDTO p: products) {
            Category category = categoryRepository.findByName(p.getCategory());
            ModelMapper modelMapper = new ModelMapper();
            Product product = modelMapper.map(p, Product.class);
            product.setCategory(category);
            productsWithCategory.add(product);
        }
        productRepository.saveAll(productsWithCategory);
        return productRepository.findAll();
    }
}
