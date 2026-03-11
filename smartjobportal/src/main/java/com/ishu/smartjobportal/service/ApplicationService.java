package com.ishu.smartjobportal.service;

import java.util.List;

import com.ishu.smartjobportal.dto.ApplicationRequestDTO;
import com.ishu.smartjobportal.dto.ApplicationResponseDTO;

public interface ApplicationService {
    ApplicationResponseDTO applyToJob(ApplicationRequestDTO request);
    
    List<ApplicationResponseDTO> getAllApplications();
    List<ApplicationResponseDTO> getMyApplications();
    List<ApplicationResponseDTO> getApplicationsForJob(Long jobId);
    public List<ApplicationResponseDTO> getApplicationsForEmployerJobs();
}
