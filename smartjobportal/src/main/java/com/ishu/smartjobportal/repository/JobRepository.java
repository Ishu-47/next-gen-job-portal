package com.ishu.smartjobportal.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ishu.smartjobportal.entity.Job;

public interface JobRepository extends JpaRepository<Job, Long> {
    Page<Job> findAll(Pageable pageable);

    List<Job> findByLocationContainingIgnoreCase(String location);

    @Query("""
            SELECT DISTINCT j
            FROM Job j
            JOIN j.skills s
            WHERE LOWER(s.name) LIKE LOWER(CONCAT('%', :skill, '%'))
            """)
    List<Job> searchJobsBySkill(@Param("skill") String skill);
}
