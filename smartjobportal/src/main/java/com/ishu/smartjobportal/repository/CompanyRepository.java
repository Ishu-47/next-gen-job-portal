package com.ishu.smartjobportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ishu.smartjobportal.entity.Company;

public interface CompanyRepository extends JpaRepository<Company,Long> {
    
}
