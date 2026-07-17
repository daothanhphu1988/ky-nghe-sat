package com.kynghesat.backend.controller;

import com.kynghesat.backend.dto.BannerDtos;
import com.kynghesat.backend.enums.BannerPosition;
import com.kynghesat.backend.service.BannerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BannerController {

    private final BannerService bannerService;

    @GetMapping("/api/banners")
    public List<BannerDtos.Response> list(@RequestParam BannerPosition position) {
        return bannerService.listActive(position);
    }

    @GetMapping("/api/admin/banners")
    public Page<BannerDtos.Response> adminList(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return bannerService.search(search, pageable);
    }

    @GetMapping("/api/admin/banners/{id}")
    public BannerDtos.Response adminGet(@PathVariable Long id) {
        return bannerService.getById(id);
    }

    @PostMapping("/api/admin/banners")
    public ResponseEntity<BannerDtos.Response> create(@Valid @RequestBody BannerDtos.Request request) {
        return ResponseEntity.ok(bannerService.create(request));
    }

    @PutMapping("/api/admin/banners/{id}")
    public BannerDtos.Response update(@PathVariable Long id, @Valid @RequestBody BannerDtos.Request request) {
        return bannerService.update(id, request);
    }

    @DeleteMapping("/api/admin/banners/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        bannerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
