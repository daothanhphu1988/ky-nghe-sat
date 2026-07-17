package com.kynghesat.backend.controller;

import com.kynghesat.backend.dto.QuoteRequestDtos;
import com.kynghesat.backend.service.QuoteRequestService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class QuoteRequestController {

    private final QuoteRequestService quoteRequestService;

    @PostMapping("/api/quote-requests")
    public ResponseEntity<QuoteRequestDtos.Response> submit(@Valid @RequestBody QuoteRequestDtos.CreateRequest request) {
        return ResponseEntity.ok(quoteRequestService.submit(request));
    }

    @GetMapping("/api/admin/quote-requests")
    public Page<QuoteRequestDtos.Response> list(
            @RequestParam(required = false) String search,
            @PageableDefault(size = 10) Pageable pageable
    ) {
        return quoteRequestService.search(search, pageable);
    }

    @PatchMapping("/api/admin/quote-requests/{id}")
    public QuoteRequestDtos.Response updateStatus(@PathVariable Long id, @RequestBody QuoteRequestDtos.StatusUpdateRequest request) {
        return quoteRequestService.updateStatus(id, request.status());
    }

    @DeleteMapping("/api/admin/quote-requests/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        quoteRequestService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
