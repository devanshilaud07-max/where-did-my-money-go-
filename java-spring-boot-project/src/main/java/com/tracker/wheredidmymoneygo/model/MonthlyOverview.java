package com.tracker.wheredidmymoneygo.model;

/**
 * Model class for Monthly Overview calculations
 * Holds Pocket Money, Total Spent, Money Left, and Progress percentage.
 */
public class MonthlyOverview {
    private double totalPocketMoney;
    private double totalSpent;
    private double moneyLeft;
    private double spendingProgressPercentage;
    private boolean isOverspent;
    private double overspentAmount;

    public MonthlyOverview(double totalPocketMoney, double totalSpent) {
        this.totalPocketMoney = totalPocketMoney;
        this.totalSpent = totalSpent;
        
        // Calculations required by college project guidelines:
        // Money Left = Monthly Pocket Money - Total Spent
        this.moneyLeft = totalPocketMoney - totalSpent;
        
        if (this.moneyLeft < 0) {
            this.isOverspent = true;
            this.overspentAmount = Math.abs(this.moneyLeft);
        } else {
            this.isOverspent = false;
            this.overspentAmount = 0.0;
        }

        // Spending Progress = (Total Spent / Pocket Money) * 100, capped at 100% for progress bar
        if (totalPocketMoney > 0) {
            double calculatedProgress = (totalSpent / totalPocketMoney) * 100.0;
            this.spendingProgressPercentage = Math.min(calculatedProgress, 100.0);
        } else {
            this.spendingProgressPercentage = 0.0;
        }
    }

    public String getFormattedPocketMoney() {
        return String.format("₹%.2f", totalPocketMoney);
    }

    public String getFormattedTotalSpent() {
        return String.format("₹%.2f", totalSpent);
    }

    public String getFormattedMoneyLeft() {
        return String.format("₹%.2f", moneyLeft);
    }

    public String getFormattedOverspentAmount() {
        return String.format("₹%.2f", overspentAmount);
    }

    public String getFormattedProgress() {
        return String.format("%.1f%%", spendingProgressPercentage);
    }

    // Getters and Setters
    public double getTotalPocketMoney() {
        return totalPocketMoney;
    }

    public void setTotalPocketMoney(double totalPocketMoney) {
        this.totalPocketMoney = totalPocketMoney;
    }

    public double getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(double totalSpent) {
        this.totalSpent = totalSpent;
    }

    public double getMoneyLeft() {
        return moneyLeft;
    }

    public void setMoneyLeft(double moneyLeft) {
        this.moneyLeft = moneyLeft;
    }

    public double getSpendingProgressPercentage() {
        return spendingProgressPercentage;
    }

    public void setSpendingProgressPercentage(double spendingProgressPercentage) {
        this.spendingProgressPercentage = spendingProgressPercentage;
    }

    public boolean isOverspent() {
        return isOverspent;
    }

    public void setOverspent(boolean overspent) {
        isOverspent = overspent;
    }

    public double getOverspentAmount() {
        return overspentAmount;
    }

    public void setOverspentAmount(double overspentAmount) {
        this.overspentAmount = overspentAmount;
    }
}
