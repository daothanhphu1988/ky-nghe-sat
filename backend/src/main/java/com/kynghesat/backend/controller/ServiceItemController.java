package com.kynghesat.backend.controller;

import com.kynghesat.backend.dto.ServiceItemDtos;
import com.kynghesat.backend.service.ServiceItemService;
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
public class ServiceItemController {

    private final ServiceItemService serviceItemService;

    @GetMapping("/api/services")
    public List<ServiceItemDtos.Response> list() {
        return serviceItemService.list();
    }

    @GetMapping("/api/services/{slug}")
    public ServiceItemDtos.Response getBySlug(@PathVariable String slug) {
        return serviceItemService.getBySlug(slug);
    }

    @GetMapping("/api/admin/services")
    public Page<ServiceItemDtos.Response> adminList(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return serviceItemService.search(search, pageable);
    }

    @GetMapping("/api/admin/services/{id}")
    public ServiceItemDtos.Response adminGet(@PathVariable Long id) {
        return serviceItemService.getById(id);
    }

    @PostMapping("/api/admin/services")
    public ResponseEntity<ServiceItemDtos.Response> create(@Valid @RequestBody ServiceItemDtos.Request request) {
        return ResponseEntity.ok(serviceItemService.create(request));
    }

    @PutMapping("/api/admin/services/{id}")
    public ServiceItemDtos.Response update(@PathVariable Long id, @Valid @RequestBody ServiceItemDtos.Request request) {
        return serviceItemService.update(id, request);
    }

    @DeleteMapping("/api/admin/services/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        serviceItemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
