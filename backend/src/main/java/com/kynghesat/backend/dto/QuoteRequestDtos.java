package com.kynghesat.backend.dto;

import com.kynghesat.backend.enums.QuoteStatus;
import com.kynghesat.backend.enums.ServiceCategory;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class QuoteRequestDtos {

    public record Response(
            Long id,
            String name,
            String phone,
            String email,
            ServiceCategory serviceCategory,
            String message,
            QuoteStatus status,
            LocalDateTime createdAt
    ) {}

    public record CreateRequest(
            @NotBlank String name,
            @NotBlank String phone,
            String email,
            ServiceCategory serviceCategory,
            String message
    ) {}

    public record StatusUpdateRequest(QuoteStatus status) {}
}
