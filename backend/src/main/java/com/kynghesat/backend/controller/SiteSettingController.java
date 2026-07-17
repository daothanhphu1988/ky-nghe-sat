package com.kynghesat.backend.controller;

import com.kynghesat.backend.entity.SiteSetting;
import com.kynghesat.backend.repository.SiteSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class SiteSettingController {

    private final SiteSettingRepository siteSettingRepository;

    @GetMapping("/api/settings")
    public Map<String, String> getSettings() {
        Map<String, String> result = new LinkedHashMap<>();
        siteSettingRepository.findAll().forEach(s -> result.put(s.getSettingKey(), s.getSettingValue()));
        return result;
    }

    @GetMapping("/api/admin/settings")
    public Map<String, String> adminGetSettings() {
        return getSettings();
    }

    @PutMapping("/api/admin/settings")
    public Map<String, String> updateSettings(@RequestBody Map<String, String> updates) {
        updates.forEach((key, value) -> {
            SiteSetting setting = siteSettingRepository.findById(key).orElseGet(() -> {
                SiteSetting s = new SiteSetting();
                s.setSettingKey(key);
                return s;
            });
            setting.setSettingValue(value);
            siteSettingRepository.save(setting);
        });
        return getSettings();
    }
}
