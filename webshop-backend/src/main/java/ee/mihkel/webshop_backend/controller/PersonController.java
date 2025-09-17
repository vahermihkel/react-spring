package ee.mihkel.webshop_backend.controller;

import ee.mihkel.webshop_backend.dto.LoginCredentialsDTO;
import ee.mihkel.webshop_backend.dto.PersonDTO;
import ee.mihkel.webshop_backend.entity.Person;
import ee.mihkel.webshop_backend.entity.PersonRole;
import ee.mihkel.webshop_backend.model.AuthToken;
import ee.mihkel.webshop_backend.repository.PersonRepository;
import ee.mihkel.webshop_backend.service.JwtService;
import ee.mihkel.webshop_backend.service.PersonService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
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
        person.setRole(PersonRole.CUSTOMER);
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

    @GetMapping("find-persons")
    public List<Person> getFoundPersons(@RequestParam String searchTerm) {
        return personRepository.searchByTerm(searchTerm);
    }

    @GetMapping("persons/{id}")
    public Person findPerson(@PathVariable Long id) {
        return personRepository.findById(id).orElseThrow();
    }

    @GetMapping("public-persons")
    public List<PersonDTO> getPublicPersons() {
        List<Person> personList = personRepository.findAll();
        System.out.println(modelMapper);
        return List.of(modelMapper.map(personList, PersonDTO[].class));
    }

    @GetMapping("person")
    public Person getPerson() {
        Person person = new Person();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getPrincipal().toString();
//        authentication.getAuthorities().;
        if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("SUPERADMIN"))) {
            person.setRole(PersonRole.SUPERADMIN);
        } else if (authentication.getAuthorities().contains(new SimpleGrantedAuthority("ADMIN"))) {
            person.setRole(PersonRole.ADMIN);
        } else {
            person.setRole(PersonRole.CUSTOMER);
        }
        System.out.println(person.getRole());
        person.setEmail(email);
        return person;
    }

    @GetMapping("profile")
    public Person getProfile() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return personRepository.findByEmail(email);
    }

    @PutMapping("profile")
    public Person updateProfile(@RequestBody Person person) {
        Long id = Long.parseLong(SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());
        if (!id.equals(person.getId())) {
            throw new RuntimeException("ID-d ei matchi");
        }

        return personRepository.save(person);
    }

    // localhost:8080/person?id=3&isAdmin=true
    @PatchMapping("person")
    public Person changeAdmin(@RequestParam Long id, boolean isAdmin) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return personRepository.findByEmail(email);
    }

    @PutMapping("person")
    public Person changePerson(@RequestBody Person person) {
        return personRepository.save(person);
    }

}
