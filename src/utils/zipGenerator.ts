import JSZip from 'jszip';
import { JAVA_PROJECT_FILES } from './javaSourceCode';

export async function downloadJavaProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root folder in the zip
  const folder = zip.folder('where-did-my-money-go') || zip;

  // Add all Java classes, pom.xml, application.properties, data.sql
  for (const file of JAVA_PROJECT_FILES) {
    folder.file(file.path, file.code);
  }

  // Add Thymeleaf index.html with the vintage coquette scrapbook styling
  const thymeleafHtml = `<!DOCTYPE html>
<html lang="en" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Where Did My Money Go? | a little diary of your spending</title>
    <link rel="stylesheet" th:href="@{/css/style.css}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Great+Vibes&family=Playfair+Display:ital,wght@0,600;0,700;1,400&display=swap" rel="stylesheet">
</head>
<body>

    <!-- HEADER -->
    <header class="site-header">
        <div class="container header-container">
            <div class="branding">
                <span class="badge-tag">♡ 20-Mark College Project ♡</span>
                <h1 class="site-title">Where Did My Money Go?</h1>
                <p class="site-subtitle">a little diary of your spending</p>
            </div>
            <nav class="main-nav">
                <a href="#overview">Overview</a>
                <a href="#add-expense">Add Expense</a>
                <a href="#breakdown">Breakdown</a>
                <a href="#history">Diary</a>
            </nav>
        </div>
    </header>

    <main class="container">
        
        <!-- HERO PANEL -->
        <section class="hero-panel">
            <div class="hero-badge">♡ A Student Pocket-Money Expense Diary ♡</div>
            <h2 class="hero-title">Where Did My Money Go?</h2>
            <p class="hero-sub">“Every rupee has a story. Let's find yours.”</p>
            <div class="hero-line">🎀</div>
        </section>

        <!-- FLASH MESSAGES -->
        <div th:if="\${successMessage}" class="alert alert-success" th:text="\${successMessage}"></div>
        <div th:if="\${errorMessage}" class="alert alert-error" th:text="\${errorMessage}"></div>

        <!-- B. MONTHLY MONEY SNAPSHOT -->
        <section id="overview" class="section-container">
            <div class="section-top">
                <div>
                    <h2 class="section-script-title">Monthly Money Snapshot</h2>
                    <p class="section-typewriter-sub" th:text="'Summary for ' + \${currentMonthFormatted}">Summary for October 2026</p>
                </div>
                <!-- Budget Setting Pinned Form -->
                <form th:action="@{/update-budget}" method="post" class="budget-pinned-form">
                    <label for="pocketMoneyInput">Monthly Budget:</label>
                    <div class="input-with-button">
                        <span class="currency-symbol">₹</span>
                        <input type="number" id="pocketMoneyInput" name="pocketMoney" th:value="\${overview.totalPocketMoney}" min="0" step="100" required>
                        <button type="submit" class="btn-secondary">Save</button>
                    </div>
                </form>
            </div>

            <!-- THREE POLAROID SUMMARY CARDS -->
            <div class="polaroid-grid">
                <div class="polaroid-card card-blush">
                    <span class="card-label">✨ POCKET MONEY ✨</span>
                    <span class="card-number" th:text="\${overview.formattedPocketMoney}">₹5,000.00</span>
                    <span class="card-note">monthly allowance budget</span>
                </div>

                <div class="polaroid-card card-chocolate">
                    <span class="card-label">☕ MONEY SPENT 🍰</span>
                    <span class="card-number" th:text="\${overview.formattedTotalSpent}">₹2,339.00</span>
                    <span class="card-note" th:text="\${expenses.size()} + ' diary record(s)'">7 recorded expense(s)</span>
                </div>

                <div class="polaroid-card card-ivory" th:classappend="\${overview.isOverspent} ? 'card-alert' : ''">
                    <span class="card-label" th:text="\${overview.isOverspent} ? '⚠️ BUDGET DEFICIT' : '🎀 MONEY LEFT'">🎀 MONEY LEFT</span>
                    <span class="card-number" th:text="\${overview.isOverspent} ? \${overview.formattedOverspentAmount} : \${overview.formattedMoneyLeft}">₹2,661.00</span>
                    <span class="card-note" th:text="\${overview.isOverspent} ? 'Oh dear! Over budget ♡' : 'Safe remaining balance ♡'">Safe remaining balance ♡</span>
                </div>
            </div>

            <!-- RIBBON PROGRESS TRACKER -->
            <div class="ribbon-tracker">
                <div class="ribbon-labels">
                    <span>🎀 Ribbon Spending Tracker</span>
                    <span th:text="\${overview.formattedProgress} + ' used'">46.8% used</span>
                </div>
                <div class="ribbon-track">
                    <div class="ribbon-fill" th:style="'width: ' + \${overview.spendingProgressPercentage} + '%;'" th:classappend="\${overview.isOverspent} ? 'fill-alert' : ''"></div>
                </div>
            </div>
        </section>

        <!-- TWO-COLUMN WORKSPACE: ADD EXPENSE & CATEGORY BREAKDOWN -->
        <div class="two-column-grid">
            
            <!-- C. ADD AN EXPENSE — THE MONEY DIARY -->
            <section id="add-expense" class="scrapbook-sheet">
                <div class="sheet-inner">
                    <h2 class="section-script-title">Add a little expense</h2>
                    <p class="section-typewriter-sub">The Money Diary &bull; Record your daily college spends</p>

                    <form th:action="@{/add-expense}" th:object="\${newExpense}" method="post" class="expense-form">
                        <div class="form-group">
                            <label for="title">Expense Name *</label>
                            <input type="text" id="title" th:field="*{title}" placeholder="e.g. Canteen iced tea, Metro pass" required>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="amount">Amount in ₹ *</label>
                                <input type="number" id="amount" th:field="*{amount}" step="0.50" min="0.50" placeholder="180.00" required>
                            </div>
                            <div class="form-group">
                                <label for="category">Category *</label>
                                <select id="category" th:field="*{category}" required>
                                    <option th:each="cat : \${categories}" th:value="\${cat}" th:text="\${cat}"></option>
                                </select>
                            </div>
                        </div>

                        <div class="form-row">
                            <div class="form-group">
                                <label for="expenseDate">Date *</label>
                                <input type="date" id="expenseDate" th:field="*{expenseDate}" required>
                            </div>
                            <div class="form-group">
                                <label for="paymentMethod">Payment Method *</label>
                                <select id="paymentMethod" th:field="*{paymentMethod}" required>
                                    <option value="UPI">UPI</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="note">Optional Note</label>
                            <input type="text" id="note" th:field="*{note}" placeholder="e.g. Shared split with roommate">
                        </div>

                        <button type="submit" class="btn-save-diary">♡ Save to My Diary ♡</button>
                    </form>
                </div>
            </section>

            <!-- D. WHERE THE MONEY WENT -->
            <section id="breakdown" class="clippings-sheet">
                <h2 class="section-script-title">Where the Money Went</h2>
                <p class="section-typewriter-sub">Category percentage breakdown</p>

                <div class="clippings-list">
                    <div th:each="item : \${breakdowns}" class="clipping-card">
                        <div class="clipping-info">
                            <span class="clipping-name" th:text="\${item.categoryName}">Food</span>
                            <div>
                                <strong th:text="\${item.formattedAmount}">₹320.00</strong>
                                <span class="clipping-pct" th:text="'(' + \${item.formattedPercentage} + ')'">(13.7%)</span>
                            </div>
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill" th:style="'width: ' + \${item.percentage} + '%;'"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- E. MY SPENDING DIARY (JOURNAL CARDS) -->
        <section id="history" class="history-container">
            <div class="section-top">
                <div>
                    <h2 class="section-script-title" style="color: #FFF8EB;">My Spending Diary</h2>
                    <p class="section-typewriter-sub" style="color: rgba(255,248,235,0.75);">Personal journal entries &bull; Filter by category and month</p>
                </div>

                <!-- FILTER CONTROLS -->
                <form th:action="@{/}" method="get" class="filter-bar">
                    <select name="category" onchange="this.form.submit()">
                        <option value="ALL" th:selected="\${selectedCategory == 'ALL'}">All Categories</option>
                        <option th:each="c : \${categories}" th:value="\${c}" th:text="\${c}" th:selected="\${selectedCategory == c}"></option>
                    </select>

                    <input type="month" name="month" th:value="\${selectedMonth}" onchange="this.form.submit()">
                </form>
            </div>

            <!-- JOURNAL CARDS GRID -->
            <div class="journal-grid" th:if="\${!expenses.isEmpty()}">
                <div th:each="e : \${expenses}" class="journal-card">
                    <div class="journal-card-top">
                        <span class="journal-date" th:text="'📅 ' + \${e.formattedDate}">📅 18 Oct 2026</span>
                        <div class="journal-tags">
                            <span class="tag-cat" th:text="\${e.category}">Food</span>
                            <span class="tag-pay" th:text="\${e.paymentMethod}">UPI</span>
                        </div>
                    </div>
                    <div class="journal-card-body">
                        <div>
                            <h3 class="journal-title" th:text="\${e.title}">Canteen Lunch</h3>
                            <p class="journal-note" th:if="\${e.note != null and !e.note.isEmpty()}" th:text="'“' + \${e.note} + '”'">“Pav bhaji with friends”</p>
                        </div>
                        <div class="journal-amount" th:text="\${e.formattedAmount}">₹180.00</div>
                    </div>
                    <div class="journal-card-footer">
                        <span class="entry-stamp">saved to diary ♡</span>
                        <form th:action="@{'/delete-expense/' + \${e.id}}" method="post" style="display:inline;">
                            <button type="submit" class="btn-delete" onclick="return confirm('Delete this diary entry?');">Delete</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- EMPTY STATE -->
            <div class="empty-diary" th:if="\${expenses.isEmpty()}">
                <p class="empty-script">Nothing in the diary yet. Your first entry goes here ♡</p>
                <p class="empty-sub">Add your first expense above or adjust your month filter.</p>
            </div>
        </section>

    </main>

    <footer class="site-footer">
        <div class="container">
            <p class="footer-title">Where Did My Money Go?</p>
            <p class="footer-desc">a little diary of your spending &bull; 20-Mark Java Spring Boot 3 College Project</p>
        </div>
    </footer>

</body>
</html>`;

  folder.file('src/main/resources/templates/index.html', thymeleafHtml);

  // Add updated static/css/style.css
  const styleCss = `/* ========================================================
   "Where Did My Money Go?"
   Vintage Coquette Scrapbook Styling
   Palette: Buttercream, Chocolate Brown, Blush Pink, Warm Ivory
   ======================================================== */

:root {
    --bg-buttercream: #F8F0C9;
    --chocolate-brown: #382526;
    --dusty-blush: #E8B4BC;
    --warm-ivory: #FFF8EB;
    --soft-rose: #D99BAA;
    --muted-taupe: #B7A59A;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    background-color: var(--bg-buttercream);
    color: var(--chocolate-brown);
    font-family: 'Courier Prime', monospace;
    line-height: 1.5;
    padding-bottom: 60px;
}

.container { max-width: 1040px; margin: 0 auto; padding: 0 20px; }

/* Header */
.site-header {
    background-color: var(--chocolate-brown);
    color: var(--warm-ivory);
    border-bottom: 2px solid rgba(217, 155, 170, 0.4);
    padding: 18px 0;
    margin-bottom: 24px;
}

.header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
}

.badge-tag {
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--dusty-blush);
    display: block;
    margin-bottom: 2px;
}

.site-title {
    font-family: 'Great Vibes', cursive;
    font-size: 38px;
    color: var(--dusty-blush);
    line-height: 1;
}

.site-subtitle {
    font-size: 12px;
    color: rgba(255, 248, 235, 0.75);
}

.main-nav a {
    color: var(--warm-ivory);
    text-decoration: none;
    font-size: 13px;
    padding: 6px 14px;
    border-radius: 20px;
    background: rgba(255,248,235,0.1);
    margin-left: 6px;
    transition: all 0.2s;
}

.main-nav a:hover {
    background: var(--dusty-blush);
    color: var(--chocolate-brown);
}

/* Hero Panel */
.hero-panel {
    background-color: var(--chocolate-brown);
    color: var(--warm-ivory);
    border-radius: 16px;
    padding: 40px 24px;
    text-align: center;
    border: 2px solid rgba(217, 155, 170, 0.4);
    margin-bottom: 30px;
}

.hero-badge {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: var(--dusty-blush);
}

.hero-title {
    font-family: 'Great Vibes', cursive;
    font-size: 56px;
    color: var(--dusty-blush);
    margin: 8px 0;
}

.hero-sub {
    font-family: 'Playfair Display', Georgia, serif;
    font-style: italic;
    font-size: 20px;
    color: var(--warm-ivory);
}

.hero-line {
    margin-top: 12px;
    font-size: 16px;
}

/* Polaroids */
.polaroid-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 20px;
    margin: 20px 0;
}

.polaroid-card {
    padding: 24px 20px;
    border-radius: 12px;
    border: 2px solid rgba(56, 37, 38, 0.2);
    box-shadow: 0 4px 14px rgba(56, 37, 38, 0.1);
    display: flex;
    flex-direction: column;
    text-align: center;
}

.card-blush { background: #FCE7EB; }
.card-chocolate { background: var(--chocolate-brown); color: var(--warm-ivory); }
.card-ivory { background: var(--warm-ivory); }
.card-alert { background: #FBEBE8; border-color: #D99BAA; }

.card-label { font-size: 11px; letter-spacing: 0.1em; font-weight: bold; margin-bottom: 8px; }
.card-number { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: bold; }
.card-note { font-size: 11px; margin-top: 6px; opacity: 0.75; }

/* Ribbon Tracker */
.ribbon-tracker {
    background: var(--warm-ivory);
    border: 1px solid var(--muted-taupe);
    border-radius: 12px;
    padding: 16px;
    margin-top: 20px;
}

.ribbon-labels { display: flex; justify-content: space-between; font-size: 12px; font-weight: bold; margin-bottom: 8px; }
.ribbon-track { width: 100%; height: 14px; background: var(--bg-buttercream); border-radius: 8px; overflow: hidden; border: 1px solid var(--muted-taupe); }
.ribbon-fill { height: 100%; background: linear-gradient(to right, var(--dusty-blush), var(--soft-rose)); border-radius: 8px; }
.fill-alert { background: #8E2820 !important; }

/* Two Columns */
.two-column-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 24px;
    margin: 30px 0;
}
@media (max-width: 800px) { .two-column-grid { grid-template-columns: 1fr; } }

.scrapbook-sheet {
    background: var(--dusty-blush);
    padding: 18px;
    border-radius: 16px;
    border: 2px solid rgba(56, 37, 38, 0.2);
}

.sheet-inner {
    background: var(--warm-ivory);
    border-radius: 10px;
    padding: 24px;
    border: 1px solid rgba(56, 37, 38, 0.3);
}

.clippings-sheet {
    background: var(--warm-ivory);
    border-radius: 16px;
    padding: 24px;
    border: 2px solid rgba(56, 37, 38, 0.2);
}

.section-script-title {
    font-family: 'Great Vibes', cursive;
    font-size: 36px;
    line-height: 1;
    color: var(--chocolate-brown);
}

.section-typewriter-sub {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.75;
    margin: 4px 0 16px 0;
}

/* Forms */
.form-group { margin-bottom: 14px; }
.form-group label { display: block; font-size: 11px; font-weight: bold; text-transform: uppercase; margin-bottom: 4px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

input, select {
    width: 100%;
    padding: 10px 12px;
    border-radius: 8px;
    background: var(--warm-ivory);
    border: 1px solid var(--chocolate-brown);
    font-family: 'Courier Prime', monospace;
    font-size: 13px;
    outline: none;
}

input:focus, select:focus {
    border-color: var(--soft-rose);
    box-shadow: 0 0 0 3px rgba(232, 180, 188, 0.5);
}

.btn-save-diary {
    width: 100%;
    background: var(--dusty-blush);
    color: var(--chocolate-brown);
    font-family: 'Courier Prime', monospace;
    font-weight: bold;
    font-size: 13px;
    padding: 12px;
    border-radius: 20px;
    border: 1px solid var(--chocolate-brown);
    cursor: pointer;
    transition: all 0.2s;
}

.btn-save-diary:hover {
    background: var(--soft-rose);
}

/* Clippings */
.clippings-list { display: flex; flex-direction: column; gap: 12px; margin-top: 16px; }
.clipping-card { background: var(--bg-buttercream); padding: 12px; border-radius: 10px; border: 1px solid var(--muted-taupe); }
.clipping-info { display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 6px; }
.clipping-pct { font-size: 10px; background: var(--dusty-blush); padding: 2px 6px; border-radius: 10px; }
.bar-track { width: 100%; height: 8px; background: var(--warm-ivory); border-radius: 4px; overflow: hidden; border: 1px solid var(--muted-taupe); }
.bar-fill { height: 100%; background: var(--soft-rose); }

/* Diary Entries (Section E) */
.history-container {
    background: var(--chocolate-brown);
    color: var(--warm-ivory);
    border-radius: 16px;
    padding: 24px;
    border: 2px solid rgba(217, 155, 170, 0.4);
    margin-top: 30px;
}

.journal-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    margin-top: 20px;
}

.journal-card {
    background: var(--warm-ivory);
    color: var(--chocolate-brown);
    border-radius: 12px;
    padding: 16px;
    border: 1px solid var(--muted-taupe);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.journal-card-top { display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 8px; }
.journal-title { font-family: 'Playfair Display', serif; font-size: 17px; font-weight: bold; }
.journal-note { font-size: 11px; font-style: italic; opacity: 0.75; margin-top: 2px; }
.journal-amount { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: bold; margin-top: 8px; }
.journal-card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 8px; border-top: 1px dashed var(--muted-taupe); }
.btn-delete { background: none; border: none; color: #8E2820; font-family: 'Courier Prime', monospace; font-size: 11px; cursor: pointer; text-decoration: underline; }

.empty-diary { text-align: center; padding: 40px 10px; }
.empty-script { font-family: 'Great Vibes', cursive; font-size: 32px; color: var(--dusty-blush); }

/* Footer */
.site-footer {
    text-align: center;
    padding: 30px 0;
    margin-top: 40px;
    border-top: 1px solid var(--muted-taupe);
}
.footer-title { font-family: 'Great Vibes', cursive; font-size: 30px; color: var(--chocolate-brown); }
.footer-desc { font-size: 11px; opacity: 0.75; }
`;

  folder.file('src/main/resources/static/css/style.css', styleCss);

  // README
  const readmeContent = `# Where Did My Money Go? — a little diary of your spending
Student Pocket-Money Expense Tracker (20-Mark College Project)
Palette: Buttercream Yellow (#F8F0C9), Dark Chocolate Brown (#382526), Dusty Blush Pink (#E8B4BC), Warm Ivory (#FFF8EB)
Tech Stack: Java 17, Spring Boot 3, Thymeleaf, Spring Data JPA, H2 Database

## Run Locally:
1. Ensure Java 17+ and Maven are installed.
2. Run:
   mvn spring-boot:run
3. Open in browser:
   http://localhost:8080
4. Inspect H2 Database:
   http://localhost:8080/h2-console
   (JDBC: jdbc:h2:mem:moneydb, User: sa)
`;

  folder.file('README.md', readmeContent);

  // Trigger download
  const content = await zip.generateAsync({ type: 'blob' });
  const downloadUrl = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.download = 'where-did-my-money-go-coquette-scrapbook.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(downloadUrl);
}
