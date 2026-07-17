package com.kynghesat.backend.service;

import com.kynghesat.backend.dto.ReviewDtos;
import com.kynghesat.backend.entity.Project;
import com.kynghesat.backend.entity.Review;
import com.kynghesat.backend.exception.NotFoundException;
import com.kynghesat.backend.repository.ProjectRepository;
import com.kynghesat.backend.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProjectRepository projectRepository;

    public List<ReviewDtos.Response> listApproved() {
        return reviewRepository.findByApprovedTrueOrderByCreatedAtDesc().stream().map(this::toResponse).toList();
    }

    public List<ReviewDtos.Response> listAll() {
        return reviewRepository.findAll().stream().map(this::toResponse).toList();
    }

    public Page<ReviewDtos.Response> search(String search, Pageable pageable) {
        String normalizedSearch = (search == null || search.isBlank()) ? "" : search.trim();
        return reviewRepository.search(normalizedSearch, pageable).map(this::toResponse);
    }

    public ReviewDtos.Response getById(Long id) {
        return toResponse(reviewRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy đánh giá id=" + id)));
    }

    @Transactional
    public ReviewDtos.Response create(ReviewDtos.Request request) {
        Review review = new Review();
        applyRequest(review, request);
        return toResponse(reviewRepository.save(review));
    }

    @Transactional
    public ReviewDtos.Response update(Long id, ReviewDtos.Request request) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy đánh giá id=" + id));
        applyRequest(review, request);
        return toResponse(reviewRepository.save(review));
    }

    @Transactional
    public void delete(Long id) {
        if (!reviewRepository.existsById(id)) {
            throw new NotFoundException("Không tìm thấy đánh giá id=" + id);
        }
        reviewRepository.deleteById(id);
    }

    private void applyRequest(Review review, ReviewDtos.Request r) {
        review.setCustomerName(r.customerName());
        review.setAvatarUrl(r.avatarUrl());
        review.setRating(r.rating());
        review.setContent(r.content());
        review.setApproved(r.approved());
        if (r.projectId() != null) {
            Project project = projectRepository.findById(r.projectId())
                    .orElseThrow(() -> new NotFoundException("Không tìm thấy công trình id=" + r.projectId()));
            review.setProject(project);
        } else {
            review.setProject(null);
        }
    }

    private ReviewDtos.Response toResponse(Review r) {
        return new ReviewDtos.Response(r.getId(), r.getCustomerName(), r.getAvatarUrl(), r.getRating(),
                r.getContent(), r.getProject() != null ? r.getProject().getId() : null, r.isApproved());
    }
}
