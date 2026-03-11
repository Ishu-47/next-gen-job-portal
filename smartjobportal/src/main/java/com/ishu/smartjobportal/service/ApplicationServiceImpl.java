package com.ishu.smartjobportal.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ishu.smartjobportal.dto.ApplicationRequestDTO;
import com.ishu.smartjobportal.dto.ApplicationResponseDTO;
import com.ishu.smartjobportal.entity.Application;
import com.ishu.smartjobportal.entity.ApplicationStatus;
import com.ishu.smartjobportal.entity.Job;
import com.ishu.smartjobportal.entity.Role;
import com.ishu.smartjobportal.entity.Skill;
import com.ishu.smartjobportal.entity.User;
import com.ishu.smartjobportal.repository.ApplicationRepository;
import com.ishu.smartjobportal.repository.JobRepository;
import com.ishu.smartjobportal.repository.UserRepository;
import com.ishu.smartjobportal.security.SecurityUtil;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;

    @Override
    public ApplicationResponseDTO applyToJob(ApplicationRequestDTO request) {
        Job job = jobRepository.findById(request.getJobId()).orElseThrow(() -> new RuntimeException("Job not found"));

        String email = SecurityUtil.getCurrentUserEmail();

        User applicant = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (applicant.getRole() != Role.JOB_SEEKER) {
            throw new RuntimeException("Only job seekers can apply");
        }

        if (applicationRepository.existsByJobIdAndApplicantId(job.getId(), applicant.getId())) {
            throw new RuntimeException("You have already applied to this job");
        }
        Set<Long> userSkillIds = applicant.getSkills()
                .stream()
                .map(Skill::getId)
                .collect(Collectors.toSet());

        Set<Long> jobSkillIds = job.getSkills()
                .stream()
                .map(Skill::getId)
                .collect(Collectors.toSet());

        long commonSkills = jobSkillIds.stream()
                .filter(userSkillIds::contains)
                .count();
        double matchScore = 0;
        if (!jobSkillIds.isEmpty()) {
            matchScore = ((double) (commonSkills / jobSkillIds.size()) * 100);
        }

        Application application = Application.builder()
                .job(job)
                .applicant(applicant)
                .status(ApplicationStatus.APPLIED)
                .appliedAt(LocalDateTime.now())
                .matchScore(matchScore)
                .build();

        Application saved = applicationRepository.save(application);

        return ApplicationResponseDTO.builder()
                .id(saved.getId())
                .jobId(job.getId())
                .jobTitle(job.getTitle())
                .applicantId(applicant.getId())
                .applicantName(applicant.getName())
                .status(saved.getStatus())
                .appliedAt(saved.getAppliedAt())
                .matchScore(saved.getMatchScore())
                .build();
    }

    @Override
    public List<ApplicationResponseDTO> getAllApplications() {
        return applicationRepository.findAll()
                .stream()
                .map(app -> ApplicationResponseDTO.builder()
                        .id(app.getId())
                        .jobId(app.getJob().getId())
                        .jobTitle(app.getJob().getTitle())
                        .applicantId(app.getApplicant().getId())
                        .applicantName(app.getApplicant().getName())
                        .status(app.getStatus())
                        .appliedAt(app.getAppliedAt())
                        .build())
                .collect(Collectors.toList());
    }

    private User getCurrentUser() {

        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        if (principal instanceof User user) {
            return userRepository.findByEmail(user.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));
        }

        throw new RuntimeException("Unauthorized");
    }

    @Override
    public List<ApplicationResponseDTO> getMyApplications() {

        User user = getCurrentUser();

        return applicationRepository.findByApplicant(user)
                .stream()
                .map(app -> ApplicationResponseDTO.builder()
                        .id(app.getId())
                        .jobId(app.getJob().getId())
                        .jobTitle(app.getJob().getTitle())
                        .applicantId(app.getApplicant().getId())
                        .applicantName(app.getApplicant().getName())
                        .status(app.getStatus())
                        .appliedAt(app.getAppliedAt())
                        .matchScore(app.getMatchScore())
                        .build())
                .toList();
    }

    @Override
public List<ApplicationResponseDTO> getApplicationsForJob(Long jobId) {

    User employer = getCurrentUser();

    Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

    // security check
    if (!job.getPostedBy().getId().equals(employer.getId())) {
        throw new RuntimeException("You are not allowed to view these applications");
    }

    return applicationRepository.findByJob(job)
            .stream()
            .map(app -> ApplicationResponseDTO.builder()
                    .id(app.getId())
                    .jobId(app.getJob().getId())
                    .jobTitle(app.getJob().getTitle())
                    .applicantId(app.getApplicant().getId())
                    .applicantName(app.getApplicant().getName())
                    .status(app.getStatus())
                    .appliedAt(app.getAppliedAt())
                    .matchScore(app.getMatchScore())
                    .build())
            .toList();
}
@Override
public List<ApplicationResponseDTO> getApplicationsForEmployerJobs() {

    String email = SecurityUtil.getCurrentUserEmail();

    User employer = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    List<Application> applications =
            applicationRepository.findByJob_PostedBy(employer);

    return applications.stream()
        .map(app -> ApplicationResponseDTO.builder()
                .id(app.getId())
                .jobId(app.getJob().getId())
                .jobTitle(app.getJob().getTitle())
                .applicantId(app.getApplicant().getId())
                .applicantName(app.getApplicant().getName())
                .appliedAt(app.getAppliedAt())
                .build())
        .toList();
}
}
