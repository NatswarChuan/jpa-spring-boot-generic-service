package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private Double price;
    private String description;

    @ManyToOne
    @jakarta.persistence.JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @jakarta.persistence.JoinColumn(name = "brand_id")
    private Brand brand;

    @ManyToOne
    @jakarta.persistence.JoinColumn(name = "model_id")
    private Model model;
}
