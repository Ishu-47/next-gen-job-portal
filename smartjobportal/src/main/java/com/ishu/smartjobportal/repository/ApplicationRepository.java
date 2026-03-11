package com.ishu.smartjobportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ishu.smartjobportal.entity.Application;
import com.ishu.smartjobportal.entity.Job;
import com.ishu.smartjobportal.entity.User;

public interface ApplicationRepository extends JpaRepository<Application, Long> {
    boolean existsByJobIdAndApplicantId(Long jobId, Long applicantId);
    List<Application> findByApplicant(User applicant);

    List<Application> findByJob(Job job);
    List<Application> findByJob_PostedBy(User employer);
}
