package com.kynghesat.backend.repository;

import com.kynghesat.backend.entity.QuoteRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface QuoteRequestRepository extends JpaRepository<QuoteRequest, Long> {
    Page<QuoteRequest> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @Query("""
            SELECT q FROM QuoteRequest q
            WHERE :search = '' OR LOWER(q.name) LIKE LOWER(CONCAT('%', :search, '%'))
                 OR LOWER(q.phone) LIKE LOWER(CONCAT('%', :search, '%'))
                 OR LOWER(q.email) LIKE LOWER(CONCAT('%', :search, '%'))
            ORDER BY q.createdAt DESC
            """)
    Page<QuoteRequest> search(@Param("search") String search, Pageable pageable);
}
