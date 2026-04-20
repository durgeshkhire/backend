package com.onlyBags.backend.entity;

import com.onlyBags.backend.entity.enums.Color;
import com.onlyBags.backend.entity.enums.Tag;
import com.onlyBags.backend.entity.enums.Type;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bags {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String nameOfBag;

    private String description;

    private String brand;

    private double price;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Enumerated(EnumType.STRING)
    private Tag tags;

    private int stock;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private Color color;

}
