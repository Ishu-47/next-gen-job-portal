package com.ishu.smartjobportal.dto;

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
public class CompanyResponseDTO {
    
    private Long id;
    private String name;
    private String description;
    private String location;
    private String website;

    private Long createdByUserId;
    private String createdByUsername;
}
