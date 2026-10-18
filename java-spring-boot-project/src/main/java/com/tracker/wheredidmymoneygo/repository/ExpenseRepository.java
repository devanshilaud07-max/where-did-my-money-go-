package com.tracker.wheredidmymoneygo.repository;

import com.tracker.wheredidmymoneygo.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * Spring Data JPA Repository for Expense entity.
 * Provides standard CRUD methods (save, findAll, deleteById)
 * plus custom query methods for filtering by category and date ranges.
 */
@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Retrieve all expenses sorted by date descending (latest first)
    List<Expense> findAllByOrderByExpenseDateDesc();

    // Filter by specific Category
    List<Expense> findByCategoryOrderByExpenseDateDesc(String category);

    // Filter by Date Range (e.g. for a specific month: startDate to endDate)
    List<Expense> findByExpenseDateBetweenOrderByExpenseDateDesc(LocalDate startDate, LocalDate endDate);

    // Filter by both Category and Date Range
    List<Expense> findByCategoryAndExpenseDateBetweenOrderByExpenseDateDesc(String category, LocalDate startDate, LocalDate endDate);
}
