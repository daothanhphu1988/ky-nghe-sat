package com.kynghesat.backend.repository;

import com.kynghesat.backend.entity.Project;
import com.kynghesat.backend.enums.ServiceCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findBySlug(String slug);
    Page<Project> findByCategory(ServiceCategory category, Pageable pageable);
    Page<Project> findByFeaturedTrue(Pageable pageable);
    boolean existsBySlug(String slug);

    @Query("""
            SELECT p FROM Project p
            WHERE (:category IS NULL OR p.category = :category)
            AND (:search = '' OR LOWER(p.title) LIKE LOWER(CONCAT('%', :search, '%'))
                 OR LOWER(p.location) LIKE LOWER(CONCAT('%', :search, '%'))
                 OR LOWER(p.customerName) LIKE LOWER(CONCAT('%', :search, '%')))
            """)
    Page<Project> search(@Param("category") ServiceCategory category, @Param("search") String search, Pageable pageable);
}
