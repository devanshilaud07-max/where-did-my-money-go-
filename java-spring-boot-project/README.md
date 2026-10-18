# 💰 Where Did My Money Go? — Student Pocket-Money Expense Tracker
> **College Project Submission (20 Marks)**  
> **Tech Stack:** Java 17, Spring Boot 3, Thymeleaf, Spring Data JPA, H2 In-Memory Database, HTML5 & CSS3

---

## 📌 Project Overview
**“Where Did My Money Go?”** is a beginner-friendly, clean, and elegant expense tracker designed specifically for college students to monitor their monthly pocket money, track categories (Food, Travel, Education, Shopping, Entertainment, etc.), understand spending habits through percentages, and stay within their monthly budget.

---

## 📁 Complete Project Structure
```text
where-did-my-money-go/
├── pom.xml                                      # Maven project configuration & dependencies
├── README.md                                    # Project documentation & viva guide
└── src/
    └── main/
        ├── java/
        │   └── com/
        │       └── tracker/
        │           └── wheredidmymoneygo/
        │               ├── WhereDidMyMoneyGoApplication.java   # Main Spring Boot Application entry point
        │               ├── controller/
        │               │   └── ExpenseController.java         # Handles web requests, form submits, routing
        │               ├── model/
        │               │   ├── Expense.java                   # JPA Entity (Maps to 'expenses' table)
        │               │   ├── CategoryBreakdown.java         # DTO for category % calculations
        │               │   └── MonthlyOverview.java           # DTO for pocket money & balance logic
        │               ├── repository/
        │               │   └── ExpenseRepository.java         # Spring Data JPA interface
        │               └── service/
        │                   └── ExpenseService.java            # Business logic, arithmetic & safe filters
        └── resources/
            ├── application.properties                   # H2 database & server configuration
            ├── data.sql                                 # Initial sample student seed expenses
            ├── static/
            │   └── css/
            │       └── style.css                        # Warm cream, gold brass & ink black styling
            └── templates/
                └── index.html                           # Thymeleaf server-rendered dynamic HTML template
```

---

## 🧮 Core Arithmetic & Viva Calculations
1. **Total Spent This Month:**
   $$\text{Total Spent} = \sum \text{expense.amount} \quad \text{for all expenses in selected month}$$
2. **Money Left (Remaining Balance):**
   $$\text{Money Left} = \text{Monthly Pocket Money} - \text{Total Spent}$$
   *(If Money Left < 0, marked as Overspent with exact deficit)*
3. **Category Spending Percentage:**
   $$\text{Category \%} = \begin{cases} \left(\frac{\text{Category Spending}}{\text{Total Spending}}\right) \times 100 & \text{if Total Spending} > 0 \\ 0\% & \text{if Total Spending} = 0 \end{cases}$$
   *(Guarded against division-by-zero errors in Java)*
4. **Monthly Spending Progress:**
   $$\text{Progress} = \min\left(\left(\frac{\text{Total Spent}}{\text{Pocket Money}}\right) \times 100, 100\%\right)$$

---

## 🚀 Step-by-Step Instructions to Run Locally

### Prerequisites
- **Java JDK 17** or higher installed (`java -version`)
- **Maven 3.8+** installed (`mvn -version`) OR modern IDE (IntelliJ IDEA, Eclipse, VS Code)

### Option 1: Running from Terminal / Command Prompt
1. Open terminal inside the project folder:
   ```bash
   cd where-did-my-money-go
   ```
2. Build and run with Maven:
   ```bash
   mvn spring-boot:run
   ```
3. Open your web browser and visit:
   ```
   http://localhost:8080
   ```
4. To view the in-memory H2 Database Console:
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:moneydb`
   - User Name: `sa`
   - Password: *(leave blank)*
   - Click **Connect** to run queries like `SELECT * FROM EXPENSES;`

### Option 2: Running via IntelliJ IDEA / Eclipse
1. Click **File -> Open...** and select the `pom.xml` or project directory.
2. Allow Maven to download dependencies (takes ~30-60 seconds on first run).
3. Navigate to `src/main/java/com/tracker/wheredidmymoneygo/WhereDidMyMoneyGoApplication.java`.
4. Right-click and choose **Run 'WhereDidMyMoneyGoApplication'**.
5. Open `http://localhost:8080` in your browser.

---

## 🎓 20-Mark College Project Viva Questions & Answers

### Q1: What is the architecture pattern used in this project?
**Answer:** The project follows the **MVC (Model-View-Controller)** design pattern:
- **Model:** `Expense.java` (Entity), `MonthlyOverview.java`, and `CategoryBreakdown.java` represent the data structures.
- **View:** `templates/index.html` rendered dynamically by the **Thymeleaf** template engine.
- **Controller:** `ExpenseController.java` handles HTTP GET/POST requests and binds the data model to the view.
- **Service & Repository:** `ExpenseService.java` isolates arithmetic logic, and `ExpenseRepository.java` isolates database queries.

### Q2: Why did you choose H2 database instead of MySQL or PostgreSQL?
**Answer:** H2 is an in-memory, embedded relational database. It requires **zero installation** or external database server configuration, making it ideal for a lightweight college project demonstration. The database is initialized automatically with sample student data from `data.sql` when the application starts.

### Q3: What is Spring Data JPA and how does `ExpenseRepository` work without any SQL queries written?
**Answer:** Spring Data JPA uses the **Repository Pattern**. By extending `JpaRepository<Expense, Long>`, Spring automatically generates standard CRUD implementations (`save()`, `findAll()`, `deleteById()`). Spring also analyzes custom method signatures like `findByCategoryOrderByExpenseDateDesc()` and dynamically creates the corresponding SQL queries at runtime.

### Q4: How is division by zero handled when calculating percentages?
**Answer:** In `ExpenseService.java`, before computing `(categoryAmount / totalSpent) * 100`, the code checks `if (totalSpent > 0.0)`. If total spent is zero (e.g. at the start of a month or when all expenses are deleted), the percentage defaults to `0.0%`, preventing `NaN` or arithmetic exceptions.

### Q5: What is the purpose of Thymeleaf expressions like `th:text` and `th:each`?
**Answer:** Thymeleaf is a server-side Java template engine.
- `th:text="${overview.formattedMoneyLeft}"` replaces the placeholder text with evaluated data from the Spring Model.
- `th:each="item : ${breakdowns}"` loops through Java collections (`List<CategoryBreakdown>`) to render dynamic HTML rows.
- `th:if="${overview.isOverspent}"` renders conditional warning banners when spending exceeds pocket money.
