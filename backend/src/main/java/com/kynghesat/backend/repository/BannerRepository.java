package com.kynghesat.backend.repository;

import com.kynghesat.backend.entity.Banner;
import com.kynghesat.backend.enums.BannerPosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BannerRepository extends JpaRepository<Banner, Long> {
    List<Banner> findByPositionAndActiveTrueOrderBySortOrderAsc(BannerPosition position);

    @Query("""
            SELECT b FROM Banner b
            WHERE :search = '' OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%'))
                 OR LOWER(b.subtitle) LIKE LOWER(CONCAT('%', :search, '%'))
            """)
    Page<Banner> search(@Param("search") String search, Pageable pageable);
}
