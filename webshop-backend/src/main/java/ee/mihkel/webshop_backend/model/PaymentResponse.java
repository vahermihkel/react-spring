package ee.mihkel.webshop_backend.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class PaymentResponse {
    private String account_name;
    private String order_reference;
    private Object email;
    private Object customer_ip;
    private String customer_url;
    private Date payment_created_at;
    private double initial_amount;
    private double standing_amount;
    private String payment_reference;
    private String payment_link;
    private ArrayList<PaymentMethod> payment_methods;
    private String api_username;
    private Object warnings;
    private Object stan;
    private Object fraud_score;
    private String payment_state;
    private Object payment_method;
    private String currency;
    private Object applepay_merchant_identifier;
    private String descriptor_country;
    private Object googlepay_merchant_identifier;
}

@Data
class PaymentMethod{
    private String source;
    private String display_name;
    private String country_code;
    private String payment_link;
    private String logo_url;
    private Object applepay_available;
    private boolean googlepay_available;
    private Object wallet_display_name;
    private boolean available;
}
