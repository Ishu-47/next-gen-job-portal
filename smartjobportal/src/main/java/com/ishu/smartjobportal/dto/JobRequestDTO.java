package com.ishu.smartjobportal.dto;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class JobRequestDTO {
    @NotBlank(message = "Job title is required")
    private String title;

    private String description;
    private String location;
    private Double salary;
    private Integer experienceRequired;
    private Set<Long> skillIds;

    @NotNull(message = "Company ID is required")
    private Long companyId;

}
