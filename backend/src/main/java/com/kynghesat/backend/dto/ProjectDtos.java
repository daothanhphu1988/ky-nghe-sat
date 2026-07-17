package com.kynghesat.backend.dto;

import com.kynghesat.backend.enums.ServiceCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public class ProjectDtos {

    public record Response(
            Long id,
            String title,
            String slug,
            ServiceCategory category,
            String location,
            Integer year,
            String area,
            String material,
            String customerName,
            Integer durationDays,
            String description,
            String coverImageUrl,
            List<String> beforeImageUrls,
            List<String> afterImageUrls,
            List<String> galleryImageUrls,
            String videoUrl,
            String panorama360Url,
            boolean featured,
            LocalDateTime createdAt
    ) {}

    public record Request(
            @NotBlank String title,
            @NotBlank String slug,
            @NotNull ServiceCategory category,
            String location,
            Integer year,
            String area,
            String material,
            String customerName,
            Integer durationDays,
            String description,
            String coverImageUrl,
            List<String> beforeImageUrls,
            List<String> afterImageUrls,
            List<String> galleryImageUrls,
            String videoUrl,
            String panorama360Url,
            boolean featured
    ) {}
}
