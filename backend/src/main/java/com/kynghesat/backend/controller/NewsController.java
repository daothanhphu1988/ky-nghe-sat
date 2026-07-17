package com.kynghesat.backend.controller;

import com.kynghesat.backend.dto.NewsDtos;
import com.kynghesat.backend.service.NewsService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class NewsController {

    private final NewsService newsService;

    @GetMapping("/api/news")
    public Page<NewsDtos.Response> list(@PageableDefault(size = 10) Pageable pageable) {
        return newsService.list(pageable);
    }

    @GetMapping("/api/news/{slug}")
    public NewsDtos.Response getBySlug(@PathVariable String slug) {
        return newsService.getBySlug(slug);
    }

    @GetMapping("/api/admin/news")
    public Page<NewsDtos.Response> adminList(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return newsService.search(search, pageable);
    }

    @GetMapping("/api/admin/news/{id}")
    public NewsDtos.Response adminGet(@PathVariable Long id) {
        return newsService.getById(id);
    }

    @PostMapping("/api/admin/news")
    public ResponseEntity<NewsDtos.Response> create(@Valid @RequestBody NewsDtos.Request request) {
        return ResponseEntity.ok(newsService.create(request));
    }

    @PutMapping("/api/admin/news/{id}")
    public NewsDtos.Response update(@PathVariable Long id, @Valid @RequestBody NewsDtos.Request request) {
        return newsService.update(id, request);
    }

    @DeleteMapping("/api/admin/news/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        newsService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
