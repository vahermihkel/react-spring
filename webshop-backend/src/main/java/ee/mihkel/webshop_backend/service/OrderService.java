package ee.mihkel.webshop_backend.service;

import ee.mihkel.webshop_backend.entity.*;
import ee.mihkel.webshop_backend.model.ParcelMachine;
import ee.mihkel.webshop_backend.model.PaymentData;
import ee.mihkel.webshop_backend.model.PaymentResponse;
import ee.mihkel.webshop_backend.repository.OrderRepository;
import ee.mihkel.webshop_backend.repository.PersonRepository;
import ee.mihkel.webshop_backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.ZonedDateTime;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    PersonRepository personRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    CacheService cacheService;

    @Value("${everypay.url}")
    String url;

    @Value("${everypay.username}")
    String username;

    @Value("${everypay.password}")
    String password;

    @Value("${everypay.customer-url}")
    String customerUrl;

    public Order saveOrder(Long personId, List<CartProduct> products) throws ExecutionException {
        Order order = new Order();
        order.setCreated(new Date());

        Person person = new Person();
        person.setId(personId);
        order.setPerson(person);

        order.setCartProducts(products);

        order.setTotalSum(calculateTotalSum(products));
        order.setPaymentStatus(PaymentStatus.INITIAL);

        return orderRepository.save(order);
    }

    private double calculateTotalSum(List<CartProduct> products) throws ExecutionException {
        double sum = 0;
        for (CartProduct cp: products) {
            Product dbProduct = cacheService.getProductFromCache(cp.getProduct().getId());
            sum += cp.getQuantity() * dbProduct.getPrice();
        }
        return sum;
    }


    public List<ParcelMachine> getParcelMachines(String country) {

        RestTemplate restTemplate = new RestTemplate();
        String url = "https://www.omniva.ee/locations.json";
        ParcelMachine[] parcelMachinesResponse = restTemplate.exchange(url, HttpMethod.GET, null, ParcelMachine[].class).getBody();
        return Arrays.stream(parcelMachinesResponse)
                .filter(e -> e.getA0_NAME().equals(country))
                .collect(Collectors.toList());
    }

    public String getPaymentLink(Order order) {
//        String url = "https://igw-demo.every-pay.com/api/v4/payments/oneoff";
        RestTemplate restTemplate = new RestTemplate();

        PaymentData data = new PaymentData();
        data.setAccount_name("EUR3D1");
        data.setNonce("dasd" + new Date() + Math.random() * 9999999);
        data.setTimestamp(ZonedDateTime.now().toString());
        data.setAmount(order.getTotalSum());
        data.setOrder_reference("arve-nr-" + order.getId());
        data.setCustomer_url(customerUrl);
        data.setApi_username(username);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBasicAuth(username, password);

        HttpEntity<PaymentData> httpEntity = new HttpEntity<>(data, headers);
        return restTemplate.exchange(url, HttpMethod.POST, httpEntity, PaymentResponse.class).getBody().getPayment_link();
    }
}
