package com.kynghesat.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "site_settings")
public class SiteSetting {

    @Id
    @Column(length = 100)
    private String settingKey;

    @Column(columnDefinition = "text")
    private String settingValue;
}
