package com.ishu.smartjobportal.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ishu.smartjobportal.dto.CompanyRequestDTO;
import com.ishu.smartjobportal.dto.CompanyResponseDTO;
import com.ishu.smartjobportal.service.CompanyService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/companies")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYER')")
public class CompanyController {
    
    private final CompanyService companyService;

    @PostMapping
    public CompanyResponseDTO createCompany(@Valid @RequestBody CompanyRequestDTO request){
        return companyService.createCompany(request);
    }
    @GetMapping
    public List<CompanyResponseDTO> getAllCompanies(){
        return companyService.getAllCompanies();
    }
}
