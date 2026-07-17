package com.kynghesat.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class MaterialRow {

    @Column(name = "material_name", length = 255)
    private String name;

    @Column(name = "material_spec", length = 255)
    private String spec;

    @Column(name = "material_note", length = 500)
    private String note;
}
