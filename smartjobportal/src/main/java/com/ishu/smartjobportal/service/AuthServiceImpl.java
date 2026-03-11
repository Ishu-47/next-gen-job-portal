package com.ishu.smartjobportal.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ishu.smartjobportal.dto.AuthResponseDTO;
import com.ishu.smartjobportal.dto.LoginRequestDTO;
import com.ishu.smartjobportal.entity.User;
import com.ishu.smartjobportal.repository.UserRepository;
import com.ishu.smartjobportal.security.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Override
    public AuthResponseDTO login(LoginRequestDTO request){
        User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid Email"));

        if(!passwordEncoder.matches(request.getPassword(), user.getPassword())){
            throw new RuntimeException(("Invalid password"));
        }
        String token = jwtUtil.generateToken(user.getEmail());

        return AuthResponseDTO.builder()
               .token(token)
               .role(user.getRole().name())
               .build();

    }
}
