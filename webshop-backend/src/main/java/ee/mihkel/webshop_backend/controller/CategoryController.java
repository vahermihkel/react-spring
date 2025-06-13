package ee.mihkel.webshop_backend.controller;

import ee.mihkel.webshop_backend.entity.Category;
import ee.mihkel.webshop_backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    @Autowired
    CategoryRepository categoryRepository;

    // localhost:8080/categories
    @GetMapping("categories")
    public List<Category> getCategories() {
        return categoryRepository.findAll(); // SELECT * FROM products
    }

    @PostMapping("categories")
    public List<Category> addCategory(@RequestBody Category category) {
        if (category.getId() != null){
            throw new RuntimeException("Cannot add with ID");
        }
        categoryRepository.save(category); // INSERT VALUES INTO products
        return categoryRepository.findAll();
    }

    @DeleteMapping("categories/{id}")
    public List<Category> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id); // DELETE FROM products
        return categoryRepository.findAll();
    }

    @GetMapping("categories/{id}")
    public Category getCategory(@PathVariable Long id) {
        return categoryRepository.findById(id).orElseThrow(); // SELECT * FROM products WHERE
    }

    @PutMapping("categories")
    public List<Category> editCategory(@RequestBody Category category) {
        if (category.getId() == null || category.getId() <= 0){
            throw new RuntimeException("Cannot edit without ID");
        }
        categoryRepository.save(category); // INSERT VALUES INTO products
        return categoryRepository.findAll();
    }

    @PatchMapping("categories/{id}")
    public List<Category> editCategoryActive(@PathVariable Long id) {
        Category category = categoryRepository.findById(id).orElseThrow();
        category.setActive(!category.isActive());
        categoryRepository.save(category);
        return categoryRepository.findAll();
    }
}
