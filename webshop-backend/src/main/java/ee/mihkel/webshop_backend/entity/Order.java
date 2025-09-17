package ee.mihkel.webshop_backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date created;
    private double totalSum;

    @OneToMany(cascade = CascadeType.ALL) // vasak pool tähendab, et ei kordu, parem pool, et mul on list
    private List<CartProduct> cartProducts;

    @ManyToOne  // vasak pool tähendab, et võivad korduda, parem pool, et mul on ainsus
    private Person person;

    private PaymentStatus paymentStatus;
}
