import { useState } from 'react';
import { useAnalyticsSummary } from '@/hooks/useData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';

export default function Analytics() {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  
  const getDateParams = () => {
    if (dateRange === 'all') return {};
    
    const days = parseInt(dateRange);
    return {
      startDate: format(subDays(new Date(), days), 'yyyy-MM-dd'),
      endDate: format(new Date(), 'yyyy-MM-dd'),
    };
  };

  const { data: summary, isLoading } = useAnalyticsSummary(getDateParams());

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading analytics...</p>
      </div>
    );
  }

  const categoryData = summary?.categoryBreakdown.map((cat) => ({
    name: cat.categoryName,
    amount: parseFloat(cat.amount as any) || 0,
    count: cat.count,
  })) || [];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <div className="date-filters">
          {(['7d', '30d', '90d', 'all'] as const).map((range) => (
            <button
              key={range}
              className={`filter-btn ${dateRange === range ? 'active' : ''}`}
              onClick={() => setDateRange(range)}
            >
              {range === 'all' ? 'All Time' : `Last ${range}`}
            </button>
          ))}
        </div>
      </div>

      <div className="analytics-grid">
        <div className="analytics-card">
          <h3>Summary</h3>
          <div className="summary-stats">
            <div className="summary-item">
              <span className="summary-label">Total Spent</span>
              <span className="summary-value">${parseFloat(summary?.totalSpent as any || 0).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Total Transactions</span>
              <span className="summary-value">{summary?.expenseCount || 0}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Daily Average</span>
              <span className="summary-value">${parseFloat(summary?.dailyAverage as any || 0).toFixed(2)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Categories Used</span>
              <span className="summary-value">{summary?.categoryBreakdown.length || 0}</span>
            </div>
          </div>
        </div>

        <div className="analytics-card full-width">
          <h3>Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="amount" fill="#4ECDC4" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-card full-width">
          <h3>Category Breakdown</h3>
          <div className="breakdown-list">
            {categoryData.map((cat, index) => (
              <div key={index} className="breakdown-item">
                <div className="breakdown-info">
                  <span className="breakdown-name">{cat.name}</span>
                  <span className="breakdown-count">{cat.count} transactions</span>
                </div>
                <div className="breakdown-amount">
                  <span className="amount-value">${cat.amount.toFixed(2)}</span>
                  <div className="breakdown-bar">
                    <div
                      className="breakdown-fill"
                      style={{
                        width: `${summary ? (cat.amount / parseFloat(summary.totalSpent as any)) * 100 : 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
