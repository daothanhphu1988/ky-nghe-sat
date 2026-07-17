package com.kynghesat.backend.controller;

import com.kynghesat.backend.dto.ProjectDtos;
import com.kynghesat.backend.enums.ServiceCategory;
import com.kynghesat.backend.service.ProjectService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("/api/projects")
    public Page<ProjectDtos.Response> list(
            @RequestParam(required = false) ServiceCategory category,
            @RequestParam(required = false) Boolean featured,
            @PageableDefault(size = 12) Pageable pageable
    ) {
        return Boolean.TRUE.equals(featured)
                ? projectService.listFeatured(pageable)
                : projectService.list(category, pageable);
    }

    @GetMapping("/api/projects/{slug}")
    public ProjectDtos.Response getBySlug(@PathVariable String slug) {
        return projectService.getBySlug(slug);
    }

    @GetMapping("/api/admin/projects")
    public Page<ProjectDtos.Response> adminList(
            @RequestParam(required = false) ServiceCategory category,
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return projectService.search(category, search, pageable);
    }

    @GetMapping("/api/admin/projects/{id}")
    public ProjectDtos.Response adminGet(@PathVariable Long id) {
        return projectService.getById(id);
    }

    @PostMapping("/api/admin/projects")
    public ResponseEntity<ProjectDtos.Response> create(@Valid @RequestBody ProjectDtos.Request request) {
        return ResponseEntity.ok(projectService.create(request));
    }

    @PutMapping("/api/admin/projects/{id}")
    public ProjectDtos.Response update(@PathVariable Long id, @Valid @RequestBody ProjectDtos.Request request) {
        return projectService.update(id, request);
    }

    @DeleteMapping("/api/admin/projects/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        projectService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
