package com.onlyBags.backend.entity;

import com.onlyBags.backend.entity.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String email;

    private String password;

    private String phone;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;


    @Builder.Default
    private boolean emailVerified =false;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Builder.Default
    private int totalRatings= 0;

    @PrePersist
    protected void onCreate(){
        createdAt= LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate(){
        updatedAt = LocalDateTime.now();
    }

}
