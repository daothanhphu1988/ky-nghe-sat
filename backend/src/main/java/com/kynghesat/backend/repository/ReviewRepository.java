package com.kynghesat.backend.repository;

import com.kynghesat.backend.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByApprovedTrueOrderByCreatedAtDesc();

    @Query("""
            SELECT r FROM Review r
            WHERE :search = '' OR LOWER(r.customerName) LIKE LOWER(CONCAT('%', :search, '%'))
                 OR LOWER(r.content) LIKE LOWER(CONCAT('%', :search, '%'))
            """)
    Page<Review> search(@Param("search") String search, Pageable pageable);
}
