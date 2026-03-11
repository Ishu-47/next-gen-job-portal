package com.ishu.smartjobportal.security;

import org.springframework.security.core.context.SecurityContextHolder;

// import com.ishu.smartjobportal.entity.User;

public class SecurityUtil {
    
    public static String getCurrentUserEmail(){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if(principal instanceof com.ishu.smartjobportal.entity.User user){
            return user.getEmail();
        }

        return  null;
    }
}
