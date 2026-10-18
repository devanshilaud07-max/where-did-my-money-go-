package com.tracker.wheredidmymoneygo.controller;

import com.tracker.wheredidmymoneygo.model.CategoryBreakdown;
import com.tracker.wheredidmymoneygo.model.Expense;
import com.tracker.wheredidmymoneygo.model.MonthlyOverview;
import com.tracker.wheredidmymoneygo.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

/**
 * Spring MVC Controller
 * Handles GET / POST routes, populates Thymeleaf Model, and redirects back to view.
 */
@Controller
public class ExpenseController {

    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    /**
     * Main Single-Page Dashboard
     * Displays Overview, Add Form, Breakdown, and History Table.
     */
    @GetMapping("/")
    public String showDashboard(
            @RequestParam(name = "category", required = false, defaultValue = "ALL") String category,
            @RequestParam(name = "month", required = false) String month,
            Model model) {

        // Default to current month if no month selected
        if (month == null || month.trim().isEmpty()) {
            month = YearMonth.now().toString(); // e.g. "2026-10"
        }

        // Retrieve filtered expenses for the history table
        List<Expense> filteredExpenses = expenseService.getFilteredExpenses(category, month);

        // Retrieve all expenses of the selected month for the Monthly Overview and Breakdown
        List<Expense> monthAllExpenses = expenseService.getFilteredExpenses("ALL", month);
        MonthlyOverview overview = expenseService.getMonthlyOverview(monthAllExpenses);
        List<CategoryBreakdown> breakdowns = expenseService.getCategoryBreakdown(monthAllExpenses);

        // Populate Model attributes for Thymeleaf
        model.addAttribute("expenses", filteredExpenses);
        model.addAttribute("overview", overview);
        model.addAttribute("breakdowns", breakdowns);
        model.addAttribute("selectedCategory", category);
        model.addAttribute("selectedMonth", month);
        model.addAttribute("currentMonthFormatted", YearMonth.parse(month).getMonth().name() + " " + YearMonth.parse(month).getYear());
        model.addAttribute("categories", ExpenseService.CATEGORIES);

        // Blank Expense object for form binding
        if (!model.containsAttribute("newExpense")) {
            Expense newExpense = new Expense();
            newExpense.setExpenseDate(LocalDate.now());
            newExpense.setPaymentMethod("UPI");
            newExpense.setCategory("Food");
            model.addAttribute("newExpense", newExpense);
        }

        return "index";
    }

    /**
     * Handle Add Expense Form Submission
     */
    @PostMapping("/add-expense")
    public String addExpense(@ModelAttribute("newExpense") Expense expense, RedirectAttributes redirectAttributes) {
        try {
            expenseService.saveExpense(expense);
            redirectAttributes.addFlashAttribute("successMessage", "Expense added successfully!");
        } catch (IllegalArgumentException ex) {
            redirectAttributes.addFlashAttribute("errorMessage", ex.getMessage());
        }
        return "redirect:/";
    }

    /**
     * Handle Delete Expense
     */
    @PostMapping("/delete-expense/{id}")
    public String deleteExpense(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        expenseService.deleteExpense(id);
        redirectAttributes.addFlashAttribute("successMessage", "Expense deleted successfully.");
        return "redirect:/";
    }

    /**
     * Update Pocket Money Budget
     */
    @PostMapping("/update-budget")
    public String updateBudget(@RequestParam("pocketMoney") double pocketMoney, RedirectAttributes redirectAttributes) {
        if (pocketMoney >= 0) {
            expenseService.setMonthlyPocketMoney(pocketMoney);
            redirectAttributes.addFlashAttribute("successMessage", "Monthly pocket money budget updated to ₹" + pocketMoney);
        } else {
            redirectAttributes.addFlashAttribute("errorMessage", "Budget cannot be negative.");
        }
        return "redirect:/";
    }
}
