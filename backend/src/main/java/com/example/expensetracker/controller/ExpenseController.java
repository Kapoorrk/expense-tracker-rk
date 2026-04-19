package com.example.expensetracker.controller;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
@CrossOrigin(origins = "*") // Enable CORS for frontend
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // POST /expenses - Add a new expense
    @PostMapping
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        try {
            Expense savedExpense = expenseService.addExpense(expense);
            return ResponseEntity.ok(savedExpense);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // GET /expenses - Get all expenses
    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    // GET /expenses/category/{category} - Filter expenses by category
    @GetMapping("/category/{category}")
    public List<Expense> getExpensesByCategory(@PathVariable String category) {
        return expenseService.getExpensesByCategory(category);
    }

    // PUT /expenses/{id} - Update expense
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable Long id, @RequestBody Expense expense) {
        try {
            Expense updatedExpense = expenseService.updateExpense(id, expense);
            return ResponseEntity.ok(updatedExpense);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // DELETE /expenses/{id} - Delete expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id) {
        try {
            expenseService.deleteExpense(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // GET /expenses/analytics/category - Total spending grouped by category
    @GetMapping("/analytics/category")
    public List<Object[]> getTotalSpendingByCategory() {
        return expenseService.getTotalSpendingByCategory();
    }

    // GET /expenses/analytics/monthly - Total spending per month
    @GetMapping("/analytics/monthly")
    public List<Object[]> getTotalSpendingByMonth() {
        return expenseService.getTotalSpendingByMonth();
    }
}