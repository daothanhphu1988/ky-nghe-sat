package com.kynghesat.backend.entity;

import com.kynghesat.backend.enums.ServiceCategory;
import com.kynghesat.backend.util.StringListConverter;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "service_items")
public class ServiceItem extends BaseEntity {

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Column(nullable = false, length = 255)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ServiceCategory category;

    private String shortDescription;

    @Column(columnDefinition = "text")
    private String content;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "text")
    private List<String> advantages;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "service_material_rows", joinColumns = @JoinColumn(name = "service_item_id"))
    @OrderColumn(name = "row_order")
    private List<MaterialRow> materialsTable = new ArrayList<>();

    private String heroImageUrl;

    @Convert(converter = StringListConverter.class)
    @Column(columnDefinition = "text")
    private List<String> galleryImageUrls;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "service_faqs", joinColumns = @JoinColumn(name = "service_item_id"))
    @OrderColumn(name = "faq_order")
    private List<Faq> faqs = new ArrayList<>();
}
