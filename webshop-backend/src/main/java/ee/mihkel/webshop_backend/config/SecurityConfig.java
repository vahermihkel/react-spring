package ee.mihkel.webshop_backend.config;

import ee.mihkel.webshop_backend.service.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.filter.OncePerRequestFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return
                http
                        .cors(Customizer.withDefaults())
                        .csrf(AbstractHttpConfigurer::disable)
                        .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers(HttpMethod.GET, "parcelmachines").permitAll()
                                .requestMatchers(HttpMethod.GET, "products").permitAll()
                                .requestMatchers(HttpMethod.GET, "products/*").permitAll()
                                .requestMatchers(HttpMethod.GET, "categories").permitAll()
                                .requestMatchers(HttpMethod.GET, "shops").permitAll()
                                .requestMatchers(HttpMethod.POST, "login").permitAll()
                                .requestMatchers(HttpMethod.POST, "signup").permitAll()
                                .requestMatchers(HttpMethod.POST, "products").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "products").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.POST, "categories").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.DELETE, "categories").hasAuthority("ADMIN")
                                .requestMatchers(HttpMethod.PATCH, "profile").hasAuthority("SUPERADMIN")
                                .requestMatchers(HttpMethod.GET, "persons").hasAuthority("SUPERADMIN")
                                .requestMatchers(HttpMethod.GET, "find-persons").hasAuthority("SUPERADMIN")
                                .requestMatchers(HttpMethod.PUT, "person").hasAuthority("SUPERADMIN")
                                .anyRequest().authenticated()
                ).addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }
}
