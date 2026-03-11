package com.ishu.smartjobportal.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ishu.smartjobportal.entity.Skill;
import com.ishu.smartjobportal.repository.SkillRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillRepository skillRepository;

    @GetMapping
    public List<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
}