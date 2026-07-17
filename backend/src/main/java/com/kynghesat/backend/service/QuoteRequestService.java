package com.kynghesat.backend.service;

import com.kynghesat.backend.dto.QuoteRequestDtos;
import com.kynghesat.backend.entity.QuoteRequest;
import com.kynghesat.backend.enums.QuoteStatus;
import com.kynghesat.backend.exception.NotFoundException;
import com.kynghesat.backend.repository.QuoteRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class QuoteRequestService {

    private final QuoteRequestRepository quoteRequestRepository;

    @Transactional
    public QuoteRequestDtos.Response submit(QuoteRequestDtos.CreateRequest request) {
        QuoteRequest quoteRequest = new QuoteRequest();
        quoteRequest.setName(request.name());
        quoteRequest.setPhone(request.phone());
        quoteRequest.setEmail(request.email());
        quoteRequest.setServiceCategory(request.serviceCategory());
        quoteRequest.setMessage(request.message());
        quoteRequest.setStatus(QuoteStatus.NEW);
        return toResponse(quoteRequestRepository.save(quoteRequest));
    }

    public Page<QuoteRequestDtos.Response> list(Pageable pageable) {
        return quoteRequestRepository.findAllByOrderByCreatedAtDesc(pageable).map(this::toResponse);
    }

    public Page<QuoteRequestDtos.Response> search(String search, Pageable pageable) {
        String normalizedSearch = (search == null || search.isBlank()) ? "" : search.trim();
        return quoteRequestRepository.search(normalizedSearch, pageable).map(this::toResponse);
    }

    @Transactional
    public QuoteRequestDtos.Response updateStatus(Long id, QuoteStatus status) {
        QuoteRequest quoteRequest = quoteRequestRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy yêu cầu id=" + id));
        quoteRequest.setStatus(status);
        return toResponse(quoteRequestRepository.save(quoteRequest));
    }

    @Transactional
    public void delete(Long id) {
        if (!quoteRequestRepository.existsById(id)) {
            throw new NotFoundException("Không tìm thấy yêu cầu id=" + id);
        }
        quoteRequestRepository.deleteById(id);
    }

    private QuoteRequestDtos.Response toResponse(QuoteRequest q) {
        return new QuoteRequestDtos.Response(q.getId(), q.getName(), q.getPhone(), q.getEmail(),
                q.getServiceCategory(), q.getMessage(), q.getStatus(), q.getCreatedAt());
    }
}
