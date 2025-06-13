package ee.mihkel.webshop_backend.dto;

import lombok.Data;

@Data
public class LoginCredentialsDTO {
    private String email;
    private String password;
}
