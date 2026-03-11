package com.ishu.smartjobportal.service;

import java.util.List;

import com.ishu.smartjobportal.dto.UserRequestDTO;
import com.ishu.smartjobportal.dto.UserResponseDTO;

public interface UserService {
    UserResponseDTO createUser(UserRequestDTO request);
    List<UserResponseDTO> getAllUsers();
    
}
