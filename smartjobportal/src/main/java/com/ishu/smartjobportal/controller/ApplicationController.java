package com.ishu.smartjobportal.controller;

import java.util.List;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;

import com.ishu.smartjobportal.dto.ApplicationRequestDTO;
import com.ishu.smartjobportal.dto.ApplicationResponseDTO;
import com.ishu.smartjobportal.service.ApplicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @PostMapping
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public ApplicationResponseDTO applyToJob(@Valid @RequestBody ApplicationRequestDTO request) {
        return applicationService.applyToJob(request);
    }

    @GetMapping
    public List<ApplicationResponseDTO> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('JOB_SEEKER')")
    public List<ApplicationResponseDTO> getMyApplications() {
        return applicationService.getMyApplications();
    }

    @GetMapping("/jobs/{jobId}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<ApplicationResponseDTO> getApplicationsForJob(
            @PathVariable Long jobId) {

        return applicationService.getApplicationsForJob(jobId);
    }

    @GetMapping("/employer")
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<ApplicationResponseDTO> getApplicationsForEmployerJobs() {
        return applicationService.getApplicationsForEmployerJobs();
    }
}
