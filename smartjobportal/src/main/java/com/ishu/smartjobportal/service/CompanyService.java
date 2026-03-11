package com.ishu.smartjobportal.service;

import java.util.List;

import com.ishu.smartjobportal.dto.CompanyRequestDTO;
import com.ishu.smartjobportal.dto.CompanyResponseDTO;

public interface CompanyService {
    CompanyResponseDTO createCompany(CompanyRequestDTO request);
    List<CompanyResponseDTO> getAllCompanies();
}
