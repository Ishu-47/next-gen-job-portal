package com.ishu.smartjobportal.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ishu.smartjobportal.dto.JobRequestDTO;
import com.ishu.smartjobportal.dto.JobResponseDTO;
import com.ishu.smartjobportal.service.JobService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobController {

    private final JobService jobService;

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public JobResponseDTO createJob(@Valid @RequestBody JobRequestDTO request) {
        return jobService.createJob(request);
    }

    @GetMapping
    public List<JobResponseDTO> getAllJob() {
        return jobService.getAllJobs();
    }

    @GetMapping("/paged")
    public Page<JobResponseDTO> getJobs(@RequestParam int page, @RequestParam int size) {
        return jobService.getJobs(page, size);
    }
    @GetMapping("/search")
    public List<JobResponseDTO> searchJobs(@RequestParam String location){
        return jobService.searchJobsByLocation(location);
    }
    @GetMapping("/search/skill")
    public List<JobResponseDTO> searchBySkill(@RequestParam String skill){
        return jobService.searchJobsBySkill(skill);
    }
}
