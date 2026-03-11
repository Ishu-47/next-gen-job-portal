package com.ishu.smartjobportal.service;

import com.ishu.smartjobportal.dto.AuthResponseDTO;
import com.ishu.smartjobportal.dto.LoginRequestDTO;

public interface AuthService {
    AuthResponseDTO login(LoginRequestDTO request);
}
