package com.ishu.smartjobportal.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.ishu.smartjobportal.dto.CompanyRequestDTO;
import com.ishu.smartjobportal.dto.CompanyResponseDTO;
import com.ishu.smartjobportal.entity.Company;
import com.ishu.smartjobportal.entity.User;
import com.ishu.smartjobportal.repository.CompanyRepository;
import com.ishu.smartjobportal.repository.UserRepository;
import com.ishu.smartjobportal.security.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {

    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Override
    public CompanyResponseDTO createCompany(CompanyRequestDTO request) {

        String email = SecurityUtil.getCurrentUserEmail();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Company company = Company.builder()
                .name(request.getName())
                .description(request.getDescription())
                .location(request.getLocation())
                .website(request.getWebsite())
                .createdBy(user)
                .build();
        Company savedCompany = companyRepository.save(company);

        return CompanyResponseDTO.builder()
                .id(savedCompany.getId())
                .name(savedCompany.getName())
                .description(savedCompany.getDescription())
                .location(savedCompany.getLocation())
                .website(savedCompany.getWebsite())
                .createdByUserId(user.getId())
                .createdByUsername(user.getName())
                .build();
    }

    @Override
    public List<CompanyResponseDTO> getAllCompanies() {

        return companyRepository.findAll()
                .stream()
                .map(company -> CompanyResponseDTO.builder()
                        .id(company.getId())
                        .name(company.getName())
                        .description(company.getDescription())
                        .location(company.getLocation())
                        .website(company.getWebsite())
                        .createdByUserId(company.getCreatedBy().getId())
                        .createdByUsername(company.getCreatedBy().getName())
                        .build())
                .collect(Collectors.toList());
    }
}
