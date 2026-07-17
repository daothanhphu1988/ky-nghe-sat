package com.kynghesat.backend.entity;

import com.kynghesat.backend.enums.ServiceCategory;
import com.kynghesat.backend.util.StringListConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "projects")
public class Project extends BaseEntity {

    @Column(nullable = false, length = 255)
    private String title;

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ServiceCategory category;

    private String location;

    private Integer year;

    private String area;

    private String material;

    private String customerName;

    private Integer durationDays;

    @Column(columnDefinition = "text")
    private String description;

    private String coverImageUrl;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "text")
    private List<String> beforeImageUrls;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "text")
    private List<String> afterImageUrls;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "text")
    private List<String> galleryImageUrls;

    private String videoUrl;

    @Column(name = "panorama360_url")
    private String panorama360Url;

    @Column(nullable = false)
    private boolean featured;
}
