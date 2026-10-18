package com.tracker.wheredidmymoneygo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Expense Entity Class
 * Maps directly to the 'expenses' table in H2 database via JPA/Hibernate.
 */
@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private Double amount;

    @Column(nullable = false)
    private String category; // Food, Travel, Shopping, Education, Entertainment, Other

    @Column(nullable = false)
    private LocalDate expenseDate;

    @Column(nullable = false)
    private String paymentMethod; // Cash, UPI, Card

    @Column(length = 255)
    private String note;

    // Default No-Args Constructor (Required by JPA)
    public Expense() {
    }

    // Parameterized Constructor for easy creation
    public Expense(String title, Double amount, String category, LocalDate expenseDate, String paymentMethod, String note) {
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.expenseDate = expenseDate;
        this.paymentMethod = paymentMethod;
        this.note = note;
    }

    // Helper getter for formatted date display (e.g., "18 Oct 2026")
    public String getFormattedDate() {
        if (this.expenseDate == null) return "";
        return this.expenseDate.format(DateTimeFormatter.ofPattern("dd MMM yyyy"));
    }

    // Helper getter for formatted currency (e.g., "₹180.00")
    public String getFormattedAmount() {
        if (this.amount == null) return "₹0.00";
        return String.format("₹%.2f", this.amount);
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }
}
