package com.kynghesat.backend.repository;

import com.kynghesat.backend.entity.ServiceItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ServiceItemRepository extends JpaRepository<ServiceItem, Long> {
    Optional<ServiceItem> findBySlug(String slug);
    boolean existsBySlug(String slug);

    @Query("""
            SELECT s FROM ServiceItem s
            WHERE :search = '' OR LOWER(s.name) LIKE LOWER(CONCAT('%', :search, '%'))
                 OR LOWER(s.slug) LIKE LOWER(CONCAT('%', :search, '%'))
            """)
    Page<ServiceItem> search(@Param("search") String search, Pageable pageable);
}
