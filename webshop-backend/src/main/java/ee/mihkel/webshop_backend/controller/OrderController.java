package ee.mihkel.webshop_backend.controller;

import ee.mihkel.webshop_backend.entity.CartProduct;
import ee.mihkel.webshop_backend.entity.Order;
import ee.mihkel.webshop_backend.model.ParcelMachine;
import ee.mihkel.webshop_backend.repository.OrderRepository;
import ee.mihkel.webshop_backend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class OrderController {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    OrderService orderService;

    @GetMapping("orders")
    public List<Order> getOrders() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return orderRepository.findByPerson_Email(email);
    }

    @PostMapping("orders")
    public String addOrder(@RequestBody List<CartProduct> products) throws ExecutionException {
        Long personId = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());
        Order order = orderService.saveOrder(personId, products);
        return orderService.getPaymentLink(order);
    }

    @GetMapping("parcelmachines")
    public List<ParcelMachine> getParcelMachines(@RequestParam String country) {
        return orderService.getParcelMachines(country);
    }
}
