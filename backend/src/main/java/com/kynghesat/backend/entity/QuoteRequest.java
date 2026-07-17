package com.kynghesat.backend.entity;

import com.kynghesat.backend.enums.QuoteStatus;
import com.kynghesat.backend.enums.ServiceCategory;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "quote_requests")
public class QuoteRequest extends BaseEntity {

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 50)
    private String phone;

    private String email;

    @Enumerated(EnumType.STRING)
    @Column(length = 50)
    private ServiceCategory serviceCategory;

    @Column(columnDefinition = "text")
    private String message;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private QuoteStatus status = QuoteStatus.NEW;
}
