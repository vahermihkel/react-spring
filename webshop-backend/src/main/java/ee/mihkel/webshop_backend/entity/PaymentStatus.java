package ee.mihkel.webshop_backend.entity;

import lombok.Data;

public enum PaymentStatus {
    INITIAL("Initial"), SETTLED("Settled"), FAILED("Failed"), VOIDED("Voided"), ABANDONED("Abandoned");

    public final String value;

    PaymentStatus(String value) {
        this.value = value;
    }

    }
