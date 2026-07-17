package com.kynghesat.backend.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public class NewsDtos {

    public record Response(
            Long id,
            String slug,
            String title,
            String excerpt,
            String content,
            String coverImageUrl,
            LocalDateTime publishedAt,
            String author
    ) {}

    public record Request(
            @NotBlank String slug,
            @NotBlank String title,
            String excerpt,
            String content,
            String coverImageUrl,
            LocalDateTime publishedAt,
            String author
    ) {}
}
