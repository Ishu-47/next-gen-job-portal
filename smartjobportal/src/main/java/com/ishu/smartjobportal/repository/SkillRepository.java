package com.ishu.smartjobportal.repository;



import org.springframework.data.jpa.repository.JpaRepository;


import com.ishu.smartjobportal.entity.Skill;

public interface SkillRepository extends JpaRepository<Skill, Long>{
    
}
