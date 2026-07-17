package com.kynghesat.backend.controller;

import com.kynghesat.backend.dto.AuthDtos;
import com.kynghesat.backend.repository.AdminUserRepository;
import com.kynghesat.backend.security.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AdminUserRepository adminUserRepository;

    @PostMapping("/login")
    public ResponseEntity<AuthDtos.LoginResponse> login(@Valid @RequestBody AuthDtos.LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password()));

        var adminUser = adminUserRepository.findByUsername(request.username()).orElseThrow();
        String token = jwtService.generateToken(adminUser.getUsername(), adminUser.getRole());

        return ResponseEntity.ok(new AuthDtos.LoginResponse(token, adminUser.getUsername(), adminUser.getRole()));
    }
}
