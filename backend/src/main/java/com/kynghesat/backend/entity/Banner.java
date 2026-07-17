package com.kynghesat.backend.entity;

import com.kynghesat.backend.enums.BannerPosition;
import com.kynghesat.backend.enums.MediaType;
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
@Table(name = "banners")
public class Banner extends BaseEntity {

    @Column(nullable = false, length = 255)
    private String title;

    private String subtitle;

    @Column(nullable = false)
    private String mediaUrl;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MediaType mediaType;

    private String ctaText;

    private String ctaLink;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private BannerPosition position;

    @Column(nullable = false)
    private boolean active;

    @Column(nullable = false)
    private Integer sortOrder;
}
