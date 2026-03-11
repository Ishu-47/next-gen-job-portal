package com.ishu.smartjobportal.service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ishu.smartjobportal.dto.JobRequestDTO;
import com.ishu.smartjobportal.dto.JobResponseDTO;
import com.ishu.smartjobportal.entity.Company;
import com.ishu.smartjobportal.entity.Job;
import com.ishu.smartjobportal.entity.Role;
import com.ishu.smartjobportal.entity.Skill;
import com.ishu.smartjobportal.entity.User;
import com.ishu.smartjobportal.repository.CompanyRepository;
import com.ishu.smartjobportal.repository.JobRepository;
import com.ishu.smartjobportal.repository.SkillRepository;
import com.ishu.smartjobportal.repository.UserRepository;
import com.ishu.smartjobportal.security.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JobServiceImpl implements JobService {

        private final JobRepository jobRepository;
        private final CompanyRepository companyRepository;
        private final UserRepository userRepository;
        private final SkillRepository skillRepository;

        @Override
        public JobResponseDTO createJob(JobRequestDTO request) {
                Company company = companyRepository.findById(request.getCompanyId())
                                .orElseThrow(() -> new RuntimeException("Company not found"));
                String email = SecurityUtil.getCurrentUserEmail();

User employer = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("User not found"));

                if (employer.getRole() != Role.EMPLOYER) {
                        throw new RuntimeException("Only employers can post jobs");
                }
                Set<Skill> skills = new HashSet<>();

                if (request.getSkillIds() != null && !request.getSkillIds().isEmpty()) {
                        skills = new HashSet<>(skillRepository.findAllById(request.getSkillIds()));
                }
                Job job = Job.builder()
                                .title(request.getTitle())
                                .description(request.getDescription())
                                .location(request.getLocation())
                                .salary(request.getSalary())
                                .experienceRequired(request.getExperienceRequired())
                                .createdAt(LocalDateTime.now())
                                .company(company)
                                .postedBy(employer)
                                .skills(skills)
                                .build();

                Job savedJob = jobRepository.save(job);

                return JobResponseDTO.builder()
                                .id(savedJob.getId())
                                .title(savedJob.getTitle())
                                .description(savedJob.getDescription())
                                .location(savedJob.getLocation())
                                .salary(savedJob.getSalary())
                                .experienceRequired(savedJob.getExperienceRequired())
                                .createdAt(savedJob.getCreatedAt())
                                .companyId(company.getId())
                                .companyName(company.getName())
                                .postedByUserId(employer.getId())
                                .postedByUserName(employer.getName())
                                .build();
        }

        @Override
        public List<JobResponseDTO> getAllJobs() {
                return jobRepository.findAll()
                                .stream()
                                .map(job -> JobResponseDTO.builder()
                                                .id(job.getId())
                                                .title(job.getTitle())
                                                .description(job.getDescription())
                                                .location(job.getLocation())
                                                .salary(job.getSalary())
                                                .experienceRequired(job.getExperienceRequired())
                                                .createdAt(job.getCreatedAt())
                                                .companyId(job.getCompany().getId())
                                                .companyName(job.getCompany().getName())
                                                .postedByUserId(job.getPostedBy().getId())
                                                .postedByUserName(job.getPostedBy().getName())
                                                .build())
                                .collect(Collectors.toList());
        }

        @Override
        public Page<JobResponseDTO> getJobs(int page, int size) {
                Pageable pageable = PageRequest.of(page, size);
                Page<Job> jobPage = jobRepository.findAll(pageable);

                return jobPage.map(job -> JobResponseDTO.builder()
                                .id(job.getId())
                                .title(job.getTitle())
                                .description(job.getDescription())
                                .location(job.getLocation())
                                .salary(job.getSalary())
                                .experienceRequired(job.getExperienceRequired())
                                .createdAt(job.getCreatedAt())
                                .companyId(job.getCompany().getId())
                                .companyName(job.getCompany().getName())
                                .postedByUserId(job.getPostedBy().getId())
                                .postedByUserName(job.getPostedBy().getName())
                                .build());
        }

        @Override
        public List<JobResponseDTO> searchJobsByLocation(String location) {

                return jobRepository.findByLocationContainingIgnoreCase(location)
                                .stream()
                                .map(job -> JobResponseDTO.builder()
                                                .id(job.getId())
                                                .title(job.getTitle())
                                                .description(job.getDescription())
                                                .location(job.getLocation())
                                                .salary(job.getSalary())
                                                .experienceRequired(job.getExperienceRequired())
                                                .createdAt(job.getCreatedAt())
                                                .companyId(job.getCompany().getId())
                                                .companyName(job.getCompany().getName())
                                                .postedByUserId(job.getPostedBy().getId())
                                                .postedByUserName(job.getPostedBy().getName())
                                                .build())
                                .toList();

        }

        @Override
        public List<JobResponseDTO> searchJobsBySkill(String skill){
                return jobRepository.searchJobsBySkill(skill)
                       .stream()
                       .map(job -> JobResponseDTO.builder()
                    .id(job.getId())
                    .title(job.getTitle())
                    .description(job.getDescription())
                    .location(job.getLocation())
                    .salary(job.getSalary())
                    .experienceRequired(job.getExperienceRequired())
                    .createdAt(job.getCreatedAt())
                    .companyId(job.getCompany().getId())
                    .companyName(job.getCompany().getName())
                    .postedByUserId(job.getPostedBy().getId())
                    .postedByUserName(job.getPostedBy().getName())
                    .build())
                    .toList();
        }
}
