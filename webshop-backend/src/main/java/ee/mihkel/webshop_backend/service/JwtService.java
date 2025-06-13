package ee.mihkel.webshop_backend.service;

import ee.mihkel.webshop_backend.entity.Person;
import ee.mihkel.webshop_backend.model.AuthToken;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

@Service
public class JwtService {

    public AuthToken generateToken(Person person) {
        String token = Jwts
                .builder()
                .subject(person.getEmail())
                .compact();
        AuthToken authToken = new AuthToken();
        authToken.setToken(token);
        return authToken;
    }

    public Person parseToken(String token) {
        Person person = new Person();
        String email = Jwts.parser()
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
        person.setEmail(email);
        return person;
    }
}
