package com.kynghesat.backend.service;

import com.kynghesat.backend.dto.ServiceItemDtos;
import com.kynghesat.backend.entity.Faq;
import com.kynghesat.backend.entity.MaterialRow;
import com.kynghesat.backend.entity.ServiceItem;
import com.kynghesat.backend.exception.NotFoundException;
import com.kynghesat.backend.repository.ServiceItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ServiceItemService {

    private final ServiceItemRepository serviceItemRepository;

    public List<ServiceItemDtos.Response> list() {
        return serviceItemRepository.findAll().stream().map(this::toResponse).toList();
    }

    public Page<ServiceItemDtos.Response> search(String search, Pageable pageable) {
        String normalizedSearch = (search == null || search.isBlank()) ? "" : search.trim();
        return serviceItemRepository.search(normalizedSearch, pageable).map(this::toResponse);
    }

    public ServiceItemDtos.Response getBySlug(String slug) {
        return toResponse(findBySlugOrThrow(slug));
    }

    public ServiceItemDtos.Response getById(Long id) {
        return toResponse(serviceItemRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy dịch vụ id=" + id)));
    }

    @Transactional
    public ServiceItemDtos.Response create(ServiceItemDtos.Request request) {
        ServiceItem item = new ServiceItem();
        applyRequest(item, request);
        return toResponse(serviceItemRepository.save(item));
    }

    @Transactional
    public ServiceItemDtos.Response update(Long id, ServiceItemDtos.Request request) {
        ServiceItem item = serviceItemRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy dịch vụ id=" + id));
        applyRequest(item, request);
        return toResponse(serviceItemRepository.save(item));
    }

    @Transactional
    public void delete(Long id) {
        if (!serviceItemRepository.existsById(id)) {
            throw new NotFoundException("Không tìm thấy dịch vụ id=" + id);
        }
        serviceItemRepository.deleteById(id);
    }

    private ServiceItem findBySlugOrThrow(String slug) {
        return serviceItemRepository.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy dịch vụ: " + slug));
    }

    private void applyRequest(ServiceItem item, ServiceItemDtos.Request r) {
        item.setSlug(r.slug());
        item.setName(r.name());
        item.setCategory(r.category());
        item.setShortDescription(r.shortDescription());
        item.setContent(r.content());
        item.setAdvantages(r.advantages());
        item.setHeroImageUrl(r.heroImageUrl());
        item.setGalleryImageUrls(r.galleryImageUrls());

        item.getMaterialsTable().clear();
        if (r.materialsTable() != null) {
            r.materialsTable().forEach(row ->
                    item.getMaterialsTable().add(new MaterialRow(row.name(), row.spec(), row.note())));
        }

        item.getFaqs().clear();
        if (r.faqs() != null) {
            r.faqs().forEach(faq ->
                    item.getFaqs().add(new Faq(faq.question(), faq.answer())));
        }
    }

    private ServiceItemDtos.Response toResponse(ServiceItem item) {
        List<ServiceItemDtos.MaterialRowDto> materials = item.getMaterialsTable().stream()
                .map(m -> new ServiceItemDtos.MaterialRowDto(m.getName(), m.getSpec(), m.getNote()))
                .toList();
        List<ServiceItemDtos.FaqDto> faqs = item.getFaqs().stream()
                .map(f -> new ServiceItemDtos.FaqDto(f.getQuestion(), f.getAnswer()))
                .toList();

        return new ServiceItemDtos.Response(
                item.getId(), item.getSlug(), item.getName(), item.getCategory(), item.getShortDescription(),
                item.getContent(), item.getAdvantages(), materials, item.getHeroImageUrl(),
                item.getGalleryImageUrls(), faqs
        );
    }
}
