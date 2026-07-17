package com.kynghesat.backend.service;

import com.kynghesat.backend.dto.NewsDtos;
import com.kynghesat.backend.entity.News;
import com.kynghesat.backend.exception.NotFoundException;
import com.kynghesat.backend.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class NewsService {

    private final NewsRepository newsRepository;

    public Page<NewsDtos.Response> list(Pageable pageable) {
        return newsRepository.findAllByOrderByPublishedAtDesc(pageable).map(this::toResponse);
    }

    public Page<NewsDtos.Response> search(String search, Pageable pageable) {
        String normalizedSearch = (search == null || search.isBlank()) ? "" : search.trim();
        return newsRepository.search(normalizedSearch, pageable).map(this::toResponse);
    }

    public NewsDtos.Response getBySlug(String slug) {
        return toResponse(newsRepository.findBySlug(slug)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bài viết: " + slug)));
    }

    public NewsDtos.Response getById(Long id) {
        return toResponse(newsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bài viết id=" + id)));
    }

    @Transactional
    public NewsDtos.Response create(NewsDtos.Request request) {
        News news = new News();
        applyRequest(news, request);
        return toResponse(newsRepository.save(news));
    }

    @Transactional
    public NewsDtos.Response update(Long id, NewsDtos.Request request) {
        News news = newsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Không tìm thấy bài viết id=" + id));
        applyRequest(news, request);
        return toResponse(newsRepository.save(news));
    }

    @Transactional
    public void delete(Long id) {
        if (!newsRepository.existsById(id)) {
            throw new NotFoundException("Không tìm thấy bài viết id=" + id);
        }
        newsRepository.deleteById(id);
    }

    private void applyRequest(News news, NewsDtos.Request r) {
        news.setSlug(r.slug());
        news.setTitle(r.title());
        news.setExcerpt(r.excerpt());
        news.setContent(r.content());
        news.setCoverImageUrl(r.coverImageUrl());
        news.setPublishedAt(r.publishedAt());
        news.setAuthor(r.author());
    }

    private NewsDtos.Response toResponse(News n) {
        return new NewsDtos.Response(n.getId(), n.getSlug(), n.getTitle(), n.getExcerpt(), n.getContent(),
                n.getCoverImageUrl(), n.getPublishedAt(), n.getAuthor());
    }
}
