package ee.mihkel.webshop_backend.service;

import ee.mihkel.webshop_backend.dto.LoginCredentialsDTO;
import ee.mihkel.webshop_backend.entity.Person;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    public void checkIfCorrect(LoginCredentialsDTO loginCredentialsDTO, Person person) {
        if (person == null) {
            throw new RuntimeException("Email not correct");
        }
        if (!person.getPassword().equals(loginCredentialsDTO.getPassword())) {
            throw new RuntimeException("Password not correct");
        }
    }

}
