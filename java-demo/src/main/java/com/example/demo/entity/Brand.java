package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Entity
@Data
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String origin;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL)
    private Set<Category> categories = new HashSet<>();
}
