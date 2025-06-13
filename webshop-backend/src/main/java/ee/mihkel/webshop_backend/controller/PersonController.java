package ee.mihkel.webshop_backend.controller;

import ee.mihkel.webshop_backend.dto.LoginCredentialsDTO;
import ee.mihkel.webshop_backend.dto.PersonDTO;
import ee.mihkel.webshop_backend.entity.Person;
import ee.mihkel.webshop_backend.model.AuthToken;
import ee.mihkel.webshop_backend.repository.PersonRepository;
import ee.mihkel.webshop_backend.service.JwtService;
import ee.mihkel.webshop_backend.service.PersonService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    @Autowired
    PersonService personService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    JwtService jwtService;

    @PostMapping("signup")
    public Person signup(@RequestBody Person person) {
        Person existingPerson = personRepository.findByEmail(person.getEmail());
        if (existingPerson != null) {
            throw new RuntimeException("Email exists");
        }
        return personRepository.save(person);
    }

    @PostMapping("login")
    public AuthToken login(@RequestBody LoginCredentialsDTO loginCredentialsDTO) {
        Person person = personRepository.findByEmail(loginCredentialsDTO.getEmail());
        personService.checkIfCorrect(loginCredentialsDTO, person);
//        AuthToken authToken = new AuthToken();
//        authToken.setToken("tähed-numbrid");
//        return authToken;
        return jwtService.generateToken(person);
    }

    @GetMapping("persons")
    public List<Person> getPersons() {
        return personRepository.findAll();
    }

    @GetMapping("public-persons")
    public List<PersonDTO> getPublicPersons() {
        List<Person> personList = personRepository.findAll();
        System.out.println(modelMapper);
        return List.of(modelMapper.map(personList, PersonDTO[].class));
    }

    @GetMapping("person/{token}")
    public Person getPerson(@PathVariable String token) {
        return jwtService.parseToken(token);
    }

}
