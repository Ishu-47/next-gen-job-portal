package com.ishu.smartjobportal.dto;

import java.time.LocalDateTime;

import com.ishu.smartjobportal.entity.ApplicationStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApplicationResponseDTO {
    
    private Long id;
    private Long jobId;
    private String jobTitle;

    private Long applicantId;
    private String applicantName;

    private ApplicationStatus status;
    private LocalDateTime appliedAt;
    private Double matchScore;
}
