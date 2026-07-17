package com.kynghesat.backend.controller;

import com.kynghesat.backend.dto.ReviewDtos;
import com.kynghesat.backend.service.ReviewService;
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
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping("/api/reviews")
    public List<ReviewDtos.Response> list() {
        return reviewService.listApproved();
    }

    @GetMapping("/api/admin/reviews")
    public Page<ReviewDtos.Response> adminList(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return reviewService.search(search, pageable);
    }

    @GetMapping("/api/admin/reviews/{id}")
    public ReviewDtos.Response adminGet(@PathVariable Long id) {
        return reviewService.getById(id);
    }

    @PostMapping("/api/admin/reviews")
    public ResponseEntity<ReviewDtos.Response> create(@Valid @RequestBody ReviewDtos.Request request) {
        return ResponseEntity.ok(reviewService.create(request));
    }

    @PutMapping("/api/admin/reviews/{id}")
    public ReviewDtos.Response update(@PathVariable Long id, @Valid @RequestBody ReviewDtos.Request request) {
        return reviewService.update(id, request);
    }

    @DeleteMapping("/api/admin/reviews/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        reviewService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
