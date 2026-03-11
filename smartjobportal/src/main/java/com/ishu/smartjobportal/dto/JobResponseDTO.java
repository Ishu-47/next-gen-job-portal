package com.ishu.smartjobportal.dto;

import java.time.LocalDateTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobResponseDTO {
    
    private Long id;
    private String title;
    private String description;
    private String location;
    private Double salary;
    private Integer experienceRequired;
    private LocalDateTime createdAt;

    private Long companyId;
    private String companyName;

    private Long postedByUserId;
    private String postedByUserName;
}
