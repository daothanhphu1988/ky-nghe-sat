package com.kynghesat.backend.repository;

import com.kynghesat.backend.entity.SiteSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SiteSettingRepository extends JpaRepository<SiteSetting, String> {
}
