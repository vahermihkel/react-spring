package ee.mihkel.webshop_backend.controller;

import ee.mihkel.webshop_backend.entity.Shop;
import ee.mihkel.webshop_backend.repository.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ShopController {

    @Autowired
    ShopRepository shopRepository;

    @GetMapping("shops")
    public List<Shop> getShops() {
        return shopRepository.findAll(); // SELECT * FROM products
    }

    @PostMapping("shops")
    public List<Shop> addShop(@RequestBody Shop shop) {
        if (shop.getId() != null){
            throw new RuntimeException("Cannot add with ID");
        }
        shopRepository.save(shop); // INSERT VALUES INTO products
        return shopRepository.findAll();
    }

    @DeleteMapping("shops/{id}")
    public List<Shop> deleteShop(@PathVariable Long id) {
        shopRepository.deleteById(id); // DELETE FROM products
        return shopRepository.findAll();
    }

    @GetMapping("shops/{id}")
    public Shop getShop(@PathVariable Long id) {
        return shopRepository.findById(id).orElseThrow(); // SELECT * FROM products WHERE
    }

    @PutMapping("shops")
    public List<Shop> editShop(@RequestBody Shop shop) {
        if (shop.getId() == null || shop.getId() <= 0){
            throw new RuntimeException("Cannot edit without ID");
        }
        shopRepository.save(shop); // INSERT VALUES INTO products
        return shopRepository.findAll();
    }
}
