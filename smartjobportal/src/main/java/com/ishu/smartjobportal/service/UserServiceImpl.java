package com.ishu.smartjobportal.service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ishu.smartjobportal.dto.UserRequestDTO;
import com.ishu.smartjobportal.dto.UserResponseDTO;
import com.ishu.smartjobportal.entity.Skill;
import com.ishu.smartjobportal.entity.User;
import com.ishu.smartjobportal.repository.SkillRepository;
import com.ishu.smartjobportal.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SkillRepository skillRepository;


    @Override
    public UserResponseDTO createUser(UserRequestDTO request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        Set<Skill> skills = new HashSet<>();
        if(request.getSkillIds() != null && !request.getSkillIds().isEmpty()){
            skills = new HashSet<>(skillRepository.findAllById(request.getSkillIds()));
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .skills(skills)
                .build();

        User savedUser = userRepository.save(user);

        return UserResponseDTO.builder()
                .id(savedUser.getId())
                .name(savedUser.getName())
                .email(savedUser.getEmail())
                .role(savedUser.getRole())
                .build();
    }

    @Override
    public List<UserResponseDTO> getAllUsers(){
        
        return userRepository.findAll()
               .stream()
               .map(user -> UserResponseDTO.builder()
               .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build())
                .collect(Collectors.toList());
    }
}
