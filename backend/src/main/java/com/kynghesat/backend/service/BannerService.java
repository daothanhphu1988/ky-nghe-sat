package com.kynghesat.backend.service;

import com.kynghesat.backend.dto.BannerDtos;
import com.kynghesat.backend.entity.Banner;
import com.kynghesat.backend.enums.BannerPosition;
import com.kynghesat.backend.exception.NotFoundException;
import com.kynghesat.backend.repository.BannerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BannerService {

    private final BannerRepository bannerRepository;

    public List<BannerDtos.Response> listActive(BannerPosition position) {
        return bannerRepository.findByPositionAndActiveTrueOrderBySortOrderAsc(position)
                .stream().map(this::toResponse).toList();
    }

    public List<BannerDtos.Response> listAll() {
        return bannerRepository.findAll().stream().map(this::toResponse).toList();
    }

    public Page<BannerDtos.Response> search(String search, Pageable pageable) {
        String normalizedSearch = (search == null || search.isBlank()) ? "" : search.trim();
        return bannerRepository.search(normalizedSearch, pageable).map(this::toResponse);
    }

    public BannerDtos.Response getById(Long id) {
        return toResponse(bannerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy banner id=" + id)));
    }

    @Transactional
    public BannerDtos.Response create(BannerDtos.Request request) {
        Banner banner = new Banner();
        applyRequest(banner, request);
        return toResponse(bannerRepository.save(banner));
    }

    @Transactional
    public BannerDtos.Response update(Long id, BannerDtos.Request request) {
        Banner banner = bannerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy banner id=" + id));
        applyRequest(banner, request);
        return toResponse(bannerRepository.save(banner));
    }

    @Transactional
    public void delete(Long id) {
        if (!bannerRepository.existsById(id)) {
            throw new NotFoundException("Không tìm thấy banner id=" + id);
        }
        bannerRepository.deleteById(id);
    }

    private void applyRequest(Banner banner, BannerDtos.Request r) {
        banner.setTitle(r.title());
        banner.setSubtitle(r.subtitle());
        banner.setMediaUrl(r.mediaUrl());
        banner.setMediaType(r.mediaType());
        banner.setCtaText(r.ctaText());
        banner.setCtaLink(r.ctaLink());
        banner.setPosition(r.position());
        banner.setActive(r.active());
        banner.setSortOrder(r.sortOrder() != null ? r.sortOrder() : 0);
    }

    private BannerDtos.Response toResponse(Banner b) {
        return new BannerDtos.Response(b.getId(), b.getTitle(), b.getSubtitle(), b.getMediaUrl(), b.getMediaType(),
                b.getCtaText(), b.getCtaLink(), b.getPosition(), b.isActive(), b.getSortOrder());
    }
}
