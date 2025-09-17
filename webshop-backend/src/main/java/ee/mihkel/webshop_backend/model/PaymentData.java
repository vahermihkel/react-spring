package ee.mihkel.webshop_backend.model;

import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class PaymentData {
    private String account_name;
    private String nonce;
    private String timestamp;
    private double amount;
    private String order_reference;
    private String customer_url;
    private String api_username;
}
