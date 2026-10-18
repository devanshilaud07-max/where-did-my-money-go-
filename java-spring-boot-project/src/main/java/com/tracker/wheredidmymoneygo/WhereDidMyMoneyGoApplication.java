package com.tracker.wheredidmymoneygo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Entry Point for "Where Did My Money Go?"
 * Student Pocket-Money Expense Tracker (College Project - 20 Marks)
 * 
 * Features demonstrated:
 * - Spring Boot Web MVC Architecture
 * - Thymeleaf server-side HTML rendering
 * - Spring Data JPA with H2 in-memory embedded database
 * - Dynamic arithmetic computations (Remaining balance, percentage breakdown)
 * - Safe division-by-zero checks and month-wise filtering
 */
@SpringBootApplication
public class WhereDidMyMoneyGoApplication {

    public static void main(String[] args) {
        SpringApplication.run(WhereDidMyMoneyGoApplication.class, args);
        System.out.println("=====================================================");
        System.out.println("  'Where Did My Money Go?' Tracker is running!");
        System.out.println("  Access Web UI at:       http://localhost:8080");
        System.out.println("  Access H2 Database at:  http://localhost:8080/h2-console");
        System.out.println("=====================================================");
    }
}
