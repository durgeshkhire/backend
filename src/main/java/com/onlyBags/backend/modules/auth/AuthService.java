package com.onlyBags.backend.modules.auth;


import com.onlyBags.backend.common.util.EmailService;
import com.onlyBags.backend.common.util.JwtUtil;
import com.onlyBags.backend.common.util.OtpStore;
import com.onlyBags.backend.entity.User;
import com.onlyBags.backend.modules.auth.dto.AuthResponse;
import com.onlyBags.backend.modules.auth.dto.LoginReq;
import com.onlyBags.backend.modules.auth.dto.RegisterReq;
import com.onlyBags.backend.modules.auth.dto.VerifyOtpRequest;
import com.onlyBags.backend.modules.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final OtpStore otpStore;
    private final EmailService emailService;

    public AuthResponse register(RegisterReq req){
        if(userRepository.existsByEmail(req.getEmail())){
            throw new RuntimeException("Email already registered!");
        }
        User user = User.builder()
                .name(req.getName())
                        .email(req.getEmail())
                                .password(passwordEncoder.encode(req.getPassword()))
                .emailVerified(true)
                                        .build();
        userRepository.save(user);

        String token= jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole().name());

    }


    public AuthResponse login(LoginReq loginReq) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));

        User user = userRepository.findByEmail(loginReq.getEmail()).orElseThrow(()-> new RuntimeException("User not found"));

        if (!user.isEmailVerified()) {
            throw new RuntimeException("Please verify your email before logging in");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return new AuthResponse(token, user.getName(), user.getEmail(), user.getRole().name());
    }

    public String sendOtp(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }
        String otp = generateOtp();
        otpStore.save(email, otp);
        emailService.sendOtp(email, otp);
        return "OTP sent to " + email;
    }

    public String verifyOtp(VerifyOtpRequest request) {
        if (!otpStore.verify(request.getEmail(), request.getOtp())) {
            throw new RuntimeException("Invalid or expired OTP");
        }
        return "Email verified. You can now complete registration.";
    }

    private String generateOtp() {
        return String.format("%06d", new Random().nextInt(999999));
    }
}
