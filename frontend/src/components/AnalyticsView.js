import React, { useState, useEffect } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

function AnalyticsView() {
  const [categoryAnalytics, setCategoryAnalytics] = useState([]);
  const [monthlyAnalytics, setMonthlyAnalytics] = useState([]);

  useEffect(() => {
    fetchCategoryAnalytics();
    fetchMonthlyAnalytics();
  }, []);

  const fetchCategoryAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/analytics/category`);
      const data = await response.json();
      setCategoryAnalytics(data);
    } catch (error) {
      console.error('Error fetching category analytics:', error);
    }
  };

  const fetchMonthlyAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/expenses/analytics/monthly`);
      const data = await response.json();
      setMonthlyAnalytics(data);
    } catch (error) {
      console.error('Error fetching monthly analytics:', error);
    }
  };

  return (
    <div>
      <h2>Analytics</h2>

      <h3>Total Spending by Category</h3>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {categoryAnalytics.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>${item[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total Spending by Month</h3>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Month</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {monthlyAnalytics.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>${item[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsView;