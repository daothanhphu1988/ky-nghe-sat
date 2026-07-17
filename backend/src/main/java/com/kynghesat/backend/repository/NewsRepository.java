package com.kynghesat.backend.repository;

import com.kynghesat.backend.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface NewsRepository extends JpaRepository<News, Long> {
    Optional<News> findBySlug(String slug);
    Page<News> findAllByOrderByPublishedAtDesc(Pageable pageable);
    boolean existsBySlug(String slug);

    @Query("""
            SELECT n FROM News n
            WHERE :search = '' OR LOWER(n.title) LIKE LOWER(CONCAT('%', :search, '%'))
                 OR LOWER(n.author) LIKE LOWER(CONCAT('%', :search, '%'))
            """)
    Page<News> search(@Param("search") String search, Pageable pageable);
}
