package com.kynghesat.backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ReviewDtos {

    public record Response(
            Long id,
            String customerName,
            String avatarUrl,
            Integer rating,
            String content,
            Long projectId,
            boolean approved
    ) {}

    public record Request(
            @NotBlank String customerName,
            String avatarUrl,
            @NotNull @Min(1) @Max(5) Integer rating,
            String content,
            Long projectId,
            boolean approved
    ) {}
}
