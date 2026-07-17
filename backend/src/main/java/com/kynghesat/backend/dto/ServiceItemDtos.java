package com.kynghesat.backend.dto;

import com.kynghesat.backend.enums.ServiceCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class ServiceItemDtos {

    public record MaterialRowDto(String name, String spec, String note) {}

    public record FaqDto(String question, String answer) {}

    public record Response(
            Long id,
            String slug,
            String name,
            ServiceCategory category,
            String shortDescription,
            String content,
            List<String> advantages,
            List<MaterialRowDto> materialsTable,
            String heroImageUrl,
            List<String> galleryImageUrls,
            List<FaqDto> faqs
    ) {}

    public record Request(
            @NotBlank String slug,
            @NotBlank String name,
            @NotNull ServiceCategory category,
            String shortDescription,
            String content,
            List<String> advantages,
            List<MaterialRowDto> materialsTable,
            String heroImageUrl,
            List<String> galleryImageUrls,
            List<FaqDto> faqs
    ) {}
}
