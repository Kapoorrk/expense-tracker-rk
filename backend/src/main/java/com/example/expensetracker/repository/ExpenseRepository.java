package com.example.expensetracker.repository;

import com.example.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    // Find expenses by category
    List<Expense> findByCategory(String category);

    // Custom query for category analytics: total spending grouped by category
    @Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category")
    List<Object[]> getTotalSpendingByCategory();

    // Custom query for monthly analytics: total spending per month
    @Query("SELECT EXTRACT(YEAR FROM e.date), EXTRACT(MONTH FROM e.date), SUM(e.amount) FROM Expense e GROUP BY EXTRACT(YEAR FROM e.date), EXTRACT(MONTH FROM e.date) ORDER BY EXTRACT(YEAR FROM e.date), EXTRACT(MONTH FROM e.date)")
    List<Object[]> getTotalSpendingByMonth();
}