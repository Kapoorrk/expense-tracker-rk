import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function ExpenseList({ expenses, onDeleteExpense }) {
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    if (categoryFilter) {
      fetchExpensesByCategory(categoryFilter);
    } else {
      setFilteredExpenses(expenses);
    }
  }, [categoryFilter, expenses]);

  const fetchExpensesByCategory = async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/category/${category}`);
      const data = await response.json();
      setFilteredExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses by category:', error);
    }
  };

  const handleFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  return (
    <div>
      <h2>Expense List</h2>
      <div className="form-group">
        <label>Filter by Category:</label>
        <select value={categoryFilter} onChange={handleFilterChange}>
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.title}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button onClick={() => onDeleteExpense(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;