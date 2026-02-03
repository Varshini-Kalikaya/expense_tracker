import React, { useState, useEffect } from "react";

// Statistics Component - Display expense analytics and insights
// Topics: useState, useEffect, Array reduce(), Object manipulation, Calculations
const Statistics = () => {
  // Sample expense data
  const expenses = [
    {
      id: 1,
      title: "Grocery Shopping",
      amount: 1200,
      category: "Food",
      date: "2026-01-25",
    },
    {
      id: 2,
      title: "Electricity Bill",
      amount: 800,
      category: "Utilities",
      date: "2026-01-24",
    },
    {
      id: 3,
      title: "Movie Tickets",
      amount: 600,
      category: "Entertainment",
      date: "2026-01-23",
    },
    {
      id: 4,
      title: "Petrol",
      amount: 1500,
      category: "Transportation",
      date: "2026-01-22",
    },
    {
      id: 5,
      title: "Restaurant Dinner",
      amount: 2500,
      category: "Food",
      date: "2026-01-21",
    },
    {
      id: 6,
      title: "Phone Bill",
      amount: 599,
      category: "Utilities",
      date: "2026-01-20",
    },
    {
      id: 7,
      title: "Gym Membership",
      amount: 1000,
      category: "Healthcare",
      date: "2026-01-19",
    },
    {
      id: 8,
      title: "Books",
      amount: 450,
      category: "Education",
      date: "2026-01-18",
    },
  ];

  // State for statistics
  const [stats, setStats] = useState({
    totalExpenses: 0,
    averageExpense: 0,
    highestExpense: {},
    lowestExpense: {},
    categoryBreakdown: {},
  });

  // Calculate statistics
  useEffect(() => {
    if (expenses.length === 0) return;

    // Total expenses
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Average expense
    const average = total / expenses.length;

    // Highest expense
    const highest = expenses.reduce((max, expense) =>
      expense.amount > max.amount ? expense : max,
    );

    // Lowest expense
    const lowest = expenses.reduce((min, expense) =>
      expense.amount < min.amount ? expense : min,
    );

    // Category breakdown
    const categoryTotals = expenses.reduce((acc, expense) => {
      if (acc[expense.category]) {
        acc[expense.category] += expense.amount;
      } else {
        acc[expense.category] = expense.amount;
      }
      return acc;
    }, {});

    setStats({
      totalExpenses: total,
      averageExpense: average,
      highestExpense: highest,
      lowestExpense: lowest,
      categoryBreakdown: categoryTotals,
    });
  }, []);

  // Calculate percentage for category
  const getPercentage = (amount) => {
    return ((amount / stats.totalExpenses) * 100).toFixed(1);
  };

  // Get bar width for visual representation
  const getBarWidth = (amount) => {
    return (amount / stats.totalExpenses) * 100;
  };

  // Sort categories by amount (highest to lowest)
  const sortedCategories = Object.entries(stats.categoryBreakdown).sort(
    ([, a], [, b]) => b - a,
  );

  return (
    <div className="statistics-container">
      <div className="stats-header">
        <h2>Expense Statistics</h2>
        <p>Analyze your spending patterns and insights</p>
      </div>

      {/* Summary Cards */}
      <div className="stats-cards">
        <div className="stat-card card-primary">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3>Total Spent</h3>
            <p className="stat-value">₹{stats.totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card card-success">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Average Expense</h3>
            <p className="stat-value">₹{stats.averageExpense.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card card-warning">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>Highest Expense</h3>
            <p className="stat-value">₹{stats.highestExpense.amount}</p>
            <small>{stats.highestExpense.title}</small>
          </div>
        </div>

        <div className="stat-card card-info">
          <div className="stat-icon">📉</div>
          <div className="stat-content">
            <h3>Lowest Expense</h3>
            <p className="stat-value">₹{stats.lowestExpense.amount}</p>
            <small>{stats.lowestExpense.title}</small>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="category-breakdown">
        <h3>Spending by Category</h3>
        <div className="category-chart">
          {sortedCategories.map(([category, amount]) => (
            <div key={category} className="category-item">
              <div className="category-info">
                <span className={`category-name ${category.toLowerCase()}`}>
                  {category}
                </span>
                <span className="category-amount">
                  ₹{amount} ({getPercentage(amount)}%)
                </span>
              </div>
              <div className="category-bar-container">
                <div
                  className={`category-bar ${category.toLowerCase()}`}
                  style={{ width: `${getBarWidth(amount)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className="insights-section">
        <h3>💡 Spending Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Top Spending Category</h4>
            <p>
              You spent the most on <strong>{sortedCategories[0]?.[0]}</strong>
              with ₹{sortedCategories[0]?.[1]}
            </p>
          </div>

          <div className="insight-card">
            <h4>Total Transactions</h4>
            <p>
              You made <strong>{expenses.length}</strong> transactions this
              month
            </p>
          </div>

          <div className="insight-card">
            <h4>Daily Average</h4>
            <p>
              Your daily average spending is approximately
              <strong> ₹{(stats.totalExpenses / 30).toFixed(2)}</strong>
            </p>
          </div>

          <div className="insight-card">
            <h4>Budget Status</h4>
            <p>
              {stats.totalExpenses > 5000 ? (
                <span className="warning">⚠️ You've exceeded your budget!</span>
              ) : (
                <span className="success">✅ You're within budget</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Monthly Comparison (Placeholder) */}
      <div className="monthly-comparison">
        <h3>📅 Monthly Trend</h3>
        <p className="placeholder-text">
          Monthly comparison chart will be available once you have data for
          multiple months. Keep tracking your expenses to see your spending
          trends!
        </p>
      </div>
    </div>
  );
};

export default Statistics;
