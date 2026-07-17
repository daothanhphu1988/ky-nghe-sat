package com.kynghesat.backend.dto;

import com.kynghesat.backend.enums.BannerPosition;
import com.kynghesat.backend.enums.MediaType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class BannerDtos {

    public record Response(
            Long id,
            String title,
            String subtitle,
            String mediaUrl,
            MediaType mediaType,
            String ctaText,
            String ctaLink,
            BannerPosition position,
            boolean active,
            Integer sortOrder
    ) {}

    public record Request(
            @NotBlank String title,
            String subtitle,
            @NotBlank String mediaUrl,
            @NotNull MediaType mediaType,
            String ctaText,
            String ctaLink,
            @NotNull BannerPosition position,
            boolean active,
            Integer sortOrder
    ) {}
}
