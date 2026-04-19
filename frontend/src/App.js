import React, { useState, useEffect } from 'react';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import AnalyticsView from './components/AnalyticsView';
import './App.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [currentView, setCurrentView] = useState('list'); // 'list', 'add', 'analytics'

  // Fetch all expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`);
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const addExpense = async (expense) => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense),
      });
      if (response.ok) {
        fetchExpenses(); // Refresh the list
        setCurrentView('list');
      } else {
        alert('Error adding expense');
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchExpenses(); // Refresh the list
      } else {
        alert('Error deleting expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  return (
    <div className="container">
      <h1>Smart Expense Tracker</h1>
      <nav>
        <button onClick={() => setCurrentView('add')}>Add Expense</button>
        <button onClick={() => setCurrentView('list')}>View Expenses</button>
        <button onClick={() => setCurrentView('analytics')}>Analytics</button>
      </nav>

      {currentView === 'add' && <AddExpenseForm onAddExpense={addExpense} />}
      {currentView === 'list' && <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />}
      {currentView === 'analytics' && <AnalyticsView />}
    </div>
  );
}

export default App;