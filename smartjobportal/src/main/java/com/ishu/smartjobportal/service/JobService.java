package com.ishu.smartjobportal.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.ishu.smartjobportal.dto.JobRequestDTO;
import com.ishu.smartjobportal.dto.JobResponseDTO;

public interface JobService {
    JobResponseDTO createJob(JobRequestDTO request);
    List<JobResponseDTO> getAllJobs();
    Page<JobResponseDTO> getJobs(int page, int size);
    List<JobResponseDTO> searchJobsByLocation(String location);
    List<JobResponseDTO> searchJobsBySkill(String skill);
}