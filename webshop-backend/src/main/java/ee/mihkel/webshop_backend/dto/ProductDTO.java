package ee.mihkel.webshop_backend.dto;

import lombok.Data;

@Data
public class ProductDTO {
    private String title;
    private double price;
    private String description;
    private String image;
    private String category;
}
