package com.tracker.wheredidmymoneygo.service;

import com.tracker.wheredidmymoneygo.model.CategoryBreakdown;
import com.tracker.wheredidmymoneygo.model.Expense;
import com.tracker.wheredidmymoneygo.model.MonthlyOverview;
import com.tracker.wheredidmymoneygo.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

/**
 * Service Layer containing all Business Logic & Calculations:
 * - Total Spent = Sum of expenses for the selected month
 * - Money Left = Monthly Pocket Money - Total Spent
 * - Category Percentage = (Category Spending / Total Spending) * 100
 * - Spending Progress = (Total Spent / Monthly Pocket Money) * 100
 * - Safe handling of empty lists & zero division prevention
 */
@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;

    // Default student monthly pocket money budget (in ₹)
    private double monthlyPocketMoney = 5000.0;

    // Standard Categories
    public static final List<String> CATEGORIES = Arrays.asList(
            "Food", "Travel", "Shopping", "Education", "Entertainment", "Other"
    );

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    /**
     * Get or set monthly pocket money budget
     */
    public double getMonthlyPocketMoney() {
        return monthlyPocketMoney;
    }

    public void setMonthlyPocketMoney(double budget) {
        if (budget >= 0) {
            this.monthlyPocketMoney = budget;
        }
    }

    /**
     * Add a new expense after simple validation
     */
    public Expense saveExpense(Expense expense) {
        if (expense.getAmount() == null || expense.getAmount() <= 0) {
            throw new IllegalArgumentException("Amount must be a positive number.");
        }
        if (expense.getTitle() == null || expense.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Expense name cannot be empty.");
        }
        if (expense.getExpenseDate() == null) {
            expense.setExpenseDate(LocalDate.now());
        }
        return expenseRepository.save(expense);
    }

    /**
     * Delete an expense by ID
     */
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    /**
     * Retrieve all expenses sorted by date
     */
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAllByOrderByExpenseDateDesc();
    }

    /**
     * Filter expenses by category and/or month (YYYY-MM format)
     */
    public List<Expense> getFilteredExpenses(String category, String monthString) {
        boolean hasCategory = category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("ALL");
        boolean hasMonth = monthString != null && !monthString.trim().isEmpty() && !monthString.equalsIgnoreCase("ALL");

        if (hasCategory && hasMonth) {
            YearMonth ym = YearMonth.parse(monthString);
            LocalDate start = ym.atDay(1);
            LocalDate end = ym.atEndOfMonth();
            return expenseRepository.findByCategoryAndExpenseDateBetweenOrderByExpenseDateDesc(category, start, end);
        } else if (hasCategory) {
            return expenseRepository.findByCategoryOrderByExpenseDateDesc(category);
        } else if (hasMonth) {
            YearMonth ym = YearMonth.parse(monthString);
            LocalDate start = ym.atDay(1);
            LocalDate end = ym.atEndOfMonth();
            return expenseRepository.findByExpenseDateBetweenOrderByExpenseDateDesc(start, end);
        } else {
            return getAllExpenses();
        }
    }

    /**
     * Compute Total Spent for a specific list of expenses
     */
    public double calculateTotalSpent(List<Expense> expenses) {
        if (expenses == null || expenses.isEmpty()) {
            return 0.0;
        }
        double sum = 0.0;
        for (Expense e : expenses) {
            if (e.getAmount() != null) {
                sum += e.getAmount();
            }
        }
        return sum;
    }

    /**
     * Generate Monthly Overview object with budget calculations
     */
    public MonthlyOverview getMonthlyOverview(List<Expense> monthlyExpenses) {
        double totalSpent = calculateTotalSpent(monthlyExpenses);
        return new MonthlyOverview(this.monthlyPocketMoney, totalSpent);
    }

    /**
     * Compute Category-wise breakdown with percentage of total spending.
     * Prevents division-by-zero error when totalSpent is 0.
     */
    public List<CategoryBreakdown> getCategoryBreakdown(List<Expense> expenses) {
        double totalSpent = calculateTotalSpent(expenses);
        Map<String, Double> categoryTotals = new LinkedHashMap<>();
        Map<String, Integer> categoryCounts = new LinkedHashMap<>();

        // Initialize all categories with 0.0
        for (String cat : CATEGORIES) {
            categoryTotals.put(cat, 0.0);
            categoryCounts.put(cat, 0);
        }

        // Accumulate amounts
        if (expenses != null) {
            for (Expense e : expenses) {
                String cat = e.getCategory();
                if (cat == null || !categoryTotals.containsKey(cat)) {
                    cat = "Other";
                }
                categoryTotals.put(cat, categoryTotals.get(cat) + (e.getAmount() != null ? e.getAmount() : 0.0));
                categoryCounts.put(cat, categoryCounts.get(cat) + 1);
            }
        }

        // Build list of breakdowns
        List<CategoryBreakdown> breakdownList = new ArrayList<>();
        for (String cat : CATEGORIES) {
            double amount = categoryTotals.get(cat);
            int count = categoryCounts.get(cat);
            
            // Percentage calculation safely guarded against zero total
            double percentage = 0.0;
            if (totalSpent > 0.0) {
                percentage = (amount / totalSpent) * 100.0;
            }

            breakdownList.add(new CategoryBreakdown(cat, amount, percentage, count));
        }

        // Sort by amount descending so highest spending category is at top
        breakdownList.sort((a, b) -> Double.compare(b.getTotalAmount(), a.getTotalAmount()));

        return breakdownList;
    }
}
