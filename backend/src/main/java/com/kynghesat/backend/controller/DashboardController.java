package com.kynghesat.backend.controller;

import com.kynghesat.backend.enums.QuoteStatus;
import com.kynghesat.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class DashboardController {

    private final ProjectRepository projectRepository;
    private final ServiceItemRepository serviceItemRepository;
    private final NewsRepository newsRepository;
    private final ReviewRepository reviewRepository;
    private final QuoteRequestRepository quoteRequestRepository;

    @GetMapping("/api/admin/dashboard")
    public Map<String, Object> dashboard() {
        long newQuoteRequests = quoteRequestRepository.findAll().stream()
                .filter(q -> q.getStatus() == QuoteStatus.NEW)
                .count();

        return Map.of(
                "projects", projectRepository.count(),
                "services", serviceItemRepository.count(),
                "news", newsRepository.count(),
                "reviews", reviewRepository.count(),
                "quoteRequests", quoteRequestRepository.count(),
                "newQuoteRequests", newQuoteRequests
        );
    }
}
