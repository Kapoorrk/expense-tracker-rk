package com.example.expensetracker.service;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    // Add a new expense
    public Expense addExpense(Expense expense) {
        // Basic validation: amount should be positive
        if (expense.getAmount() <= 0) {
            throw new IllegalArgumentException("Amount must be greater than 0");
        }
        return expenseRepository.save(expense);
    }

    // Get all expenses
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // Get expenses by category
    public List<Expense> getExpensesByCategory(String category) {
        return expenseRepository.findByCategory(category);
    }

    // Update an expense
    public Expense updateExpense(Long id, Expense expenseDetails) {
        Optional<Expense> optionalExpense = expenseRepository.findById(id);
        if (optionalExpense.isPresent()) {
            Expense expense = optionalExpense.get();
            expense.setTitle(expenseDetails.getTitle());
            expense.setAmount(expenseDetails.getAmount());
            expense.setCategory(expenseDetails.getCategory());
            expense.setDate(expenseDetails.getDate());
            return expenseRepository.save(expense);
        } else {
            throw new RuntimeException("Expense not found with id: " + id);
        }
    }

    // Delete an expense
    public void deleteExpense(Long id) {
        if (expenseRepository.existsById(id)) {
            expenseRepository.deleteById(id);
        } else {
            throw new RuntimeException("Expense not found with id: " + id);
        }
    }

    // Get total spending by category
    public List<Object[]> getTotalSpendingByCategory() {
        return expenseRepository.getTotalSpendingByCategory();
    }

    // Get total spending by month
    public List<Object[]> getTotalSpendingByMonth() {
        return expenseRepository.getTotalSpendingByMonth();
    }
}