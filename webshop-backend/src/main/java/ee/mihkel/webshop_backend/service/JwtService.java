package ee.mihkel.webshop_backend.service;

import ee.mihkel.webshop_backend.entity.Person;
import ee.mihkel.webshop_backend.entity.PersonRole;
import ee.mihkel.webshop_backend.model.AuthToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;

@Service
public class JwtService {

    String jwtSecret = "7JDcGgPXARTpKVIsH342qLULpBiRlSNcvjcVNfBrGxA";
    SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));

    public AuthToken generateToken(Person person) {
        String token = Jwts
                .builder()
                .signWith(key)
                .claim("userId", person.getId())
                .claim("role", person.getRole())
                .subject(person.getEmail())
                .compact();
        AuthToken authToken = new AuthToken();
        authToken.setToken(token);
        authToken.setRole(person.getRole().toString());
        return authToken;
    }

    public Person parseToken(String token) {
        Person person = new Person();
        Claims claims = Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        String email = claims.getSubject();
        Long id = Long.parseLong(claims.get("userId").toString());
        PersonRole role = PersonRole.valueOf(claims.get("role").toString());
        person.setId(id);
        person.setEmail(email);
        person.setRole(role);
        return person;
    }
}
