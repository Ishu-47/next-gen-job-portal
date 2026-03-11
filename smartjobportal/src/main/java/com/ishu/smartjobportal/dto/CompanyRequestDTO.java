package com.ishu.smartjobportal.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CompanyRequestDTO {
    
    @NotBlank(message = "Company name is required")
    private String name;

    private String description;
    private String location;
    private String website;

}
