package com.kynghesat.backend.service;

import com.kynghesat.backend.dto.ProjectDtos;
import com.kynghesat.backend.entity.Project;
import com.kynghesat.backend.enums.ServiceCategory;
import com.kynghesat.backend.exception.NotFoundException;
import com.kynghesat.backend.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProjectService {

    private final ProjectRepository projectRepository;

    public Page<ProjectDtos.Response> list(ServiceCategory category, Pageable pageable) {
        Page<Project> page = category != null
                ? projectRepository.findByCategory(category, pageable)
                : projectRepository.findAll(pageable);
        return page.map(this::toResponse);
    }

    public Page<ProjectDtos.Response> listFeatured(Pageable pageable) {
        return projectRepository.findByFeaturedTrue(pageable).map(this::toResponse);
    }

    public Page<ProjectDtos.Response> search(ServiceCategory category, String search, Pageable pageable) {
        String normalizedSearch = (search == null || search.isBlank()) ? "" : search.trim();
        return projectRepository.search(category, normalizedSearch, pageable).map(this::toResponse);
    }

    public ProjectDtos.Response getBySlug(String slug) {
        return toResponse(findBySlugOrThrow(slug));
    }

    public ProjectDtos.Response getById(Long id) {
        return toResponse(projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy công trình id=" + id)));
    }

    @Transactional
    public ProjectDtos.Response create(ProjectDtos.Request request) {
        Project project = new Project();
        applyRequest(project, request);
        return toResponse(projectRepository.save(project));
    }

    @Transactional
    public ProjectDtos.Response update(Long id, ProjectDtos.Request request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy công trình id=" + id));
        applyRequest(project, request);
        return toResponse(projectRepository.save(project));
    }

    @Transactional
    public void delete(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new NotFoundException("Không tìm thấy công trình id=" + id);
        }
        projectRepository.deleteById(id);
    }

    private Project findBySlugOrThrow(String slug) {
        return projectRepository.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy công trình: " + slug));
    }

    private void applyRequest(Project project, ProjectDtos.Request r) {
        project.setTitle(r.title());
        project.setSlug(r.slug());
        project.setCategory(r.category());
        project.setLocation(r.location());
        project.setYear(r.year());
        project.setArea(r.area());
        project.setMaterial(r.material());
        project.setCustomerName(r.customerName());
        project.setDurationDays(r.durationDays());
        project.setDescription(r.description());
        project.setCoverImageUrl(r.coverImageUrl());
        project.setBeforeImageUrls(r.beforeImageUrls());
        project.setAfterImageUrls(r.afterImageUrls());
        project.setGalleryImageUrls(r.galleryImageUrls());
        project.setVideoUrl(r.videoUrl());
        project.setPanorama360Url(r.panorama360Url());
        project.setFeatured(r.featured());
    }

    private ProjectDtos.Response toResponse(Project p) {
        return new ProjectDtos.Response(
                p.getId(), p.getTitle(), p.getSlug(), p.getCategory(), p.getLocation(), p.getYear(),
                p.getArea(), p.getMaterial(), p.getCustomerName(), p.getDurationDays(), p.getDescription(),
                p.getCoverImageUrl(), p.getBeforeImageUrls(), p.getAfterImageUrls(), p.getGalleryImageUrls(),
                p.getVideoUrl(), p.getPanorama360Url(), p.isFeatured(), p.getCreatedAt()
        );
    }
}
