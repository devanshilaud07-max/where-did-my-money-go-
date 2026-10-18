package com.tracker.wheredidmymoneygo.model;

/**
 * Model class for Category Spending Breakdown
 * Used to display category horizontal bars and percentage calculations.
 */
public class CategoryBreakdown {
    private String categoryName;
    private double totalAmount;
    private double percentage;
    private int itemCount;

    public CategoryBreakdown(String categoryName, double totalAmount, double percentage, int itemCount) {
        this.categoryName = categoryName;
        this.totalAmount = totalAmount;
        this.percentage = percentage;
        this.itemCount = itemCount;
    }

    public String getFormattedAmount() {
        return String.format("₹%.2f", totalAmount);
    }

    public String getFormattedPercentage() {
        return String.format("%.1f%%", percentage);
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }

    public int getItemCount() {
        return itemCount;
    }

    public void setItemCount(int itemCount) {
        this.itemCount = itemCount;
    }
}
