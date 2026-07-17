package com.kynghesat.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "news")
public class News extends BaseEntity {

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Column(nullable = false, length = 255)
    private String title;

    private String excerpt;

    @Column(columnDefinition = "text")
    private String content;

    private String coverImageUrl;

    private LocalDateTime publishedAt;

    private String author;
}
