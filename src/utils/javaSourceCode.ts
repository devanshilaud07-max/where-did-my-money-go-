export interface JavaFileEntry {
  path: string;
  filename: string;
  language: string;
  badge: string;
  description: string;
  code: string;
}

export const JAVA_PROJECT_FILES: JavaFileEntry[] = [
  {
    path: 'src/main/java/com/tracker/wheredidmymoneygo/WhereDidMyMoneyGoApplication.java',
    filename: 'WhereDidMyMoneyGoApplication.java',
    language: 'java',
    badge: 'Main Class',
    description: 'Spring Boot main entry point that boots the embedded Tomcat server on port 8080 and initializes the H2 database.',
    code: `package com.tracker.wheredidmymoneygo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Entry Point for "Where Did My Money Go?"
 * Student Pocket-Money Expense Tracker (College Project - 20 Marks)
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
}`
  },
  {
    path: 'src/main/java/com/tracker/wheredidmymoneygo/model/Expense.java',
    filename: 'Expense.java',
    language: 'java',
    badge: 'JPA Entity',
    description: 'Maps directly to the "expenses" relational table in H2 database with primary key, validations, and getters/setters.',
    code: `package com.tracker.wheredidmymoneygo.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

    public Expense() {}

    public Expense(String title, Double amount, String category, LocalDate expenseDate, String paymentMethod, String note) {
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.expenseDate = expenseDate;
        this.paymentMethod = paymentMethod;
        this.note = note;
    }

    public String getFormattedDate() {
        if (this.expenseDate == null) return "";
        return this.expenseDate.format(DateTimeFormatter.ofPattern("dd MMM yyyy"));
    }

    public String getFormattedAmount() {
        if (this.amount == null) return "₹0.00";
        return String.format("₹%.2f", this.amount);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public LocalDate getExpenseDate() { return expenseDate; }
    public void setExpenseDate(LocalDate expenseDate) { this.expenseDate = expenseDate; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}`
  },
  {
    path: 'src/main/java/com/tracker/wheredidmymoneygo/service/ExpenseService.java',
    filename: 'ExpenseService.java',
    language: 'java',
    badge: 'Service & Arithmetic',
    description: 'Encapsulates all calculations: Sum of spent, Money Left, Category %, and zero-division prevention logic.',
    code: `package com.tracker.wheredidmymoneygo.service;

import com.tracker.wheredidmymoneygo.model.CategoryBreakdown;
import com.tracker.wheredidmymoneygo.model.Expense;
import com.tracker.wheredidmymoneygo.model.MonthlyOverview;
import com.tracker.wheredidmymoneygo.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.*;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private double monthlyPocketMoney = 5000.0;

    public static final List<String> CATEGORIES = Arrays.asList(
            "Food", "Travel", "Shopping", "Education", "Entertainment", "Other"
    );

    @Autowired
    public ExpenseService(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    public double getMonthlyPocketMoney() { return monthlyPocketMoney; }
    public void setMonthlyPocketMoney(double budget) {
        if (budget >= 0) this.monthlyPocketMoney = budget;
    }

    public Expense saveExpense(Expense expense) {
        if (expense.getAmount() == null || expense.getAmount() <= 0) {
            throw new IllegalArgumentException("Amount must be positive.");
        }
        if (expense.getTitle() == null || expense.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Expense name cannot be empty.");
        }
        if (expense.getExpenseDate() == null) {
            expense.setExpenseDate(LocalDate.now());
        }
        return expenseRepository.save(expense);
    }

    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }

    public List<Expense> getAllExpenses() {
        return expenseRepository.findAllByOrderByExpenseDateDesc();
    }

    public List<Expense> getFilteredExpenses(String category, String monthString) {
        boolean hasCat = category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("ALL");
        boolean hasMonth = monthString != null && !monthString.trim().isEmpty() && !monthString.equalsIgnoreCase("ALL");

        if (hasCat && hasMonth) {
            YearMonth ym = YearMonth.parse(monthString);
            return expenseRepository.findByCategoryAndExpenseDateBetweenOrderByExpenseDateDesc(
                category, ym.atDay(1), ym.atEndOfMonth());
        } else if (hasCat) {
            return expenseRepository.findByCategoryOrderByExpenseDateDesc(category);
        } else if (hasMonth) {
            YearMonth ym = YearMonth.parse(monthString);
            return expenseRepository.findByExpenseDateBetweenOrderByExpenseDateDesc(
                ym.atDay(1), ym.atEndOfMonth());
        } else {
            return getAllExpenses();
        }
    }

    public double calculateTotalSpent(List<Expense> expenses) {
        if (expenses == null || expenses.isEmpty()) return 0.0;
        return expenses.stream()
                .mapToDouble(e -> e.getAmount() != null ? e.getAmount() : 0.0)
                .sum();
    }

    public MonthlyOverview getMonthlyOverview(List<Expense> monthlyExpenses) {
        double totalSpent = calculateTotalSpent(monthlyExpenses);
        return new MonthlyOverview(this.monthlyPocketMoney, totalSpent);
    }

    public List<CategoryBreakdown> getCategoryBreakdown(List<Expense> expenses) {
        double totalSpent = calculateTotalSpent(expenses);
        Map<String, Double> totals = new LinkedHashMap<>();
        Map<String, Integer> counts = new LinkedHashMap<>();

        for (String c : CATEGORIES) {
            totals.put(c, 0.0);
            counts.put(c, 0);
        }

        if (expenses != null) {
            for (Expense e : expenses) {
                String cat = e.getCategory();
                if (!totals.containsKey(cat)) cat = "Other";
                totals.put(cat, totals.get(cat) + (e.getAmount() != null ? e.getAmount() : 0.0));
                counts.put(cat, counts.get(cat) + 1);
            }
        }

        List<CategoryBreakdown> list = new ArrayList<>();
        for (String c : CATEGORIES) {
            double amt = totals.get(c);
            int count = counts.get(c);
            // Safe division by zero check:
            double pct = (totalSpent > 0.0) ? (amt / totalSpent) * 100.0 : 0.0;
            list.add(new CategoryBreakdown(c, amt, pct, count));
        }

        list.sort((a, b) -> Double.compare(b.getTotalAmount(), a.getTotalAmount()));
        return list;
    }
}`
  },
  {
    path: 'src/main/java/com/tracker/wheredidmymoneygo/controller/ExpenseController.java',
    filename: 'ExpenseController.java',
    language: 'java',
    badge: 'MVC Controller',
    description: 'Thymeleaf controller handling single-page dashboard rendering, expense additions, budget updates, and deletion redirects.',
    code: `package com.tracker.wheredidmymoneygo.controller;

import com.tracker.wheredidmymoneygo.model.*;
import com.tracker.wheredidmymoneygo.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Controller
public class ExpenseController {

    private final ExpenseService expenseService;

    @Autowired
    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @GetMapping("/")
    public String showDashboard(
            @RequestParam(name = "category", required = false, defaultValue = "ALL") String category,
            @RequestParam(name = "month", required = false) String month,
            Model model) {

        if (month == null || month.trim().isEmpty()) {
            month = YearMonth.now().toString(); // e.g. "2026-10"
        }

        List<Expense> filteredExpenses = expenseService.getFilteredExpenses(category, month);
        List<Expense> monthAllExpenses = expenseService.getFilteredExpenses("ALL", month);

        MonthlyOverview overview = expenseService.getMonthlyOverview(monthAllExpenses);
        List<CategoryBreakdown> breakdowns = expenseService.getCategoryBreakdown(monthAllExpenses);

        model.addAttribute("expenses", filteredExpenses);
        model.addAttribute("overview", overview);
        model.addAttribute("breakdowns", breakdowns);
        model.addAttribute("selectedCategory", category);
        model.addAttribute("selectedMonth", month);
        model.addAttribute("currentMonthFormatted", YearMonth.parse(month).getMonth().name() + " " + YearMonth.parse(month).getYear());
        model.addAttribute("categories", ExpenseService.CATEGORIES);

        if (!model.containsAttribute("newExpense")) {
            Expense newExpense = new Expense();
            newExpense.setExpenseDate(LocalDate.now());
            newExpense.setPaymentMethod("UPI");
            newExpense.setCategory("Food");
            model.addAttribute("newExpense", newExpense);
        }

        return "index";
    }

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

    @PostMapping("/delete-expense/{id}")
    public String deleteExpense(@PathVariable("id") Long id, RedirectAttributes redirectAttributes) {
        expenseService.deleteExpense(id);
        redirectAttributes.addFlashAttribute("successMessage", "Expense deleted successfully.");
        return "redirect:/";
    }

    @PostMapping("/update-budget")
    public String updateBudget(@RequestParam("pocketMoney") double pocketMoney, RedirectAttributes redirectAttributes) {
        if (pocketMoney >= 0) {
            expenseService.setMonthlyPocketMoney(pocketMoney);
            redirectAttributes.addFlashAttribute("successMessage", "Monthly budget updated to ₹" + pocketMoney);
        }
        return "redirect:/";
    }
}`
  },
  {
    path: 'src/main/java/com/tracker/wheredidmymoneygo/repository/ExpenseRepository.java',
    filename: 'ExpenseRepository.java',
    language: 'java',
    badge: 'JPA Repository',
    description: 'Interface extending JpaRepository that automatically generates SQL queries for filtering by date, month, and category.',
    code: `package com.tracker.wheredidmymoneygo.repository;

import com.tracker.wheredidmymoneygo.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findAllByOrderByExpenseDateDesc();

    List<Expense> findByCategoryOrderByExpenseDateDesc(String category);

    List<Expense> findByExpenseDateBetweenOrderByExpenseDateDesc(LocalDate startDate, LocalDate endDate);

    List<Expense> findByCategoryAndExpenseDateBetweenOrderByExpenseDateDesc(String category, LocalDate startDate, LocalDate endDate);
}`
  },
  {
    path: 'pom.xml',
    filename: 'pom.xml',
    language: 'xml',
    badge: 'Maven Build',
    description: 'Defines Java 17, Spring Boot Starter Web, Thymeleaf, Spring Data JPA, and H2 in-memory embedded database.',
    code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
        <relativePath/>
    </parent>
    <groupId>com.tracker</groupId>
    <artifactId>where-did-my-money-go</artifactId>
    <version>1.0.0</version>
    <name>Where Did My Money Go</name>
    <description>Student Pocket-Money Expense Tracker (College Project)</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-thymeleaf</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>`
  },
  {
    path: 'src/main/resources/application.properties',
    filename: 'application.properties',
    language: 'properties',
    badge: 'Properties',
    description: 'Configures embedded H2 in-memory DB connection string, JPA console endpoint, and Thymeleaf cache settings.',
    code: `server.port=8080
spring.application.name=WhereDidMyMoneyGo

# H2 In-Memory Database
spring.datasource.url=jdbc:h2:mem:moneydb;DB_CLOSE_DELAY=-1;DB_CLOSE_ON_EXIT=FALSE
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=

# JPA / Hibernate
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# H2 Web Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Thymeleaf
spring.thymeleaf.cache=false`
  },
  {
    path: 'src/main/resources/data.sql',
    filename: 'data.sql',
    language: 'sql',
    badge: 'Seed SQL',
    description: 'Initial student pocket-money expense rows inserted automatically into H2 on startup for testing.',
    code: `INSERT INTO expenses (title, amount, category, expense_date, payment_method, note) 
VALUES ('College Canteen Lunch & Chai', 180.00, 'Food', '2026-10-18', 'UPI', 'Pav bhaji and cutting chai with friends');

INSERT INTO expenses (title, amount, category, expense_date, payment_method, note) 
VALUES ('Metro Card Recharge', 500.00, 'Travel', '2026-10-16', 'Card', 'Monthly student commute pass');

INSERT INTO expenses (title, amount, category, expense_date, payment_method, note) 
VALUES ('Data Structures Reference Book', 450.00, 'Education', '2026-10-12', 'UPI', 'Purchased from college bookstore');

INSERT INTO expenses (title, amount, category, expense_date, payment_method, note) 
VALUES ('Weekend Movie Ticket', 250.00, 'Entertainment', '2026-10-10', 'Card', 'Student discount morning show');

INSERT INTO expenses (title, amount, category, expense_date, payment_method, note) 
VALUES ('Hostel Stationery & Printouts', 120.00, 'Education', '2026-10-08', 'Cash', 'Project assignment submissions');`
  }
];
