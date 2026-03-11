package com.ishu.smartjobportal.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ishu.smartjobportal.dto.AuthResponseDTO;
import com.ishu.smartjobportal.dto.LoginRequestDTO;
import com.ishu.smartjobportal.dto.UserRequestDTO;
import com.ishu.smartjobportal.dto.UserResponseDTO;
import com.ishu.smartjobportal.service.AuthService;
import com.ishu.smartjobportal.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    private final UserService userService;

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody LoginRequestDTO request){
        return authService.login(request);
    }
    //create users
    @PostMapping("/register")
    public UserResponseDTO createUser(@Valid @RequestBody UserRequestDTO request){
        return userService.createUser(request);
    }

}
