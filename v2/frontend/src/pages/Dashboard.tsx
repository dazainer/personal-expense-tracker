import { useAnalyticsSummary, useTrends, useExpenses } from '@/hooks/useData';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { DollarSign, TrendingUp, Receipt, Calendar, AlertCircle } from 'lucide-react';

export default function Dashboard() {
  const { data: summary, isLoading: summaryLoading, error: summaryError } = useAnalyticsSummary();
  const { data: trends, isLoading: trendsLoading, error: trendsError } = useTrends(30);
  const { data: recentExpenses, error: expensesError } = useExpenses();

  // Check for errors
  if (summaryError || trendsError || expensesError) {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
    return (
      <div className="loading">
        <AlertCircle size={48} color="#FF6B6B" />
        <h2>Cannot connect to backend</h2>
        <p>App is trying to reach: <code style={{ fontSize: '0.85rem', wordBreak: 'break-all' }}>{apiBase}</code></p>
        <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>
          {apiBase.startsWith('http://localhost') ? (
            <>Local mode: run the backend with <code>cd backend && npm run dev</code></>
          ) : (
            <>Check that the backend is up and reachable (e.g. open {apiBase.replace('/api', '')}/health in your browser).</>
          )}
        </p>
      </div>
    );
  }

  if (summaryLoading || trendsLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const COLORS = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA07A',
    '#98D8C8',
    '#F7DC6F',
    '#95A5A6',
  ];

  const pieData = summary?.categoryBreakdown.map((cat) => ({
    name: cat.categoryName,
    value: parseFloat(cat.amount as any) || 0,
  })) || [];

  const lineData = trends?.map((t) => ({
    date: format(new Date(t.date), 'MMM dd'),
    amount: parseFloat(t.amount as any) || 0,
  })) || [];

  const recent = recentExpenses?.slice(0, 5) || [];

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FF6B6B' }}>
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Spent</p>
            <p className="stat-value">${parseFloat(summary?.totalSpent as any || 0).toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#4ECDC4' }}>
            <Receipt size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Expenses</p>
            <p className="stat-value">{summary?.expenseCount || 0}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#45B7D1' }}>
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Daily Average</p>
            <p className="stat-value">${parseFloat(summary?.dailyAverage as any || 0).toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#FFA07A' }}>
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Top Category</p>
            <p className="stat-value">
              {summary?.categoryBreakdown[0]?.categoryName || 'N/A'}
            </p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Spending Trend (Last 30 Days)</h2>
          {lineData.length === 0 ? (
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
              <p>No data yet. Add some expenses to see trends!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#4ECDC4"
                  strokeWidth={3}
                  dot={{ fill: '#4ECDC4', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="chart-card">
          <h2>Category Breakdown</h2>
          {pieData.length === 0 ? (
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
              <p>No expenses yet. Start tracking!</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: $${entry.value.toFixed(0)}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="recent-section">
        <h2>Recent Expenses</h2>
        <div className="recent-list">
          {recent.length === 0 ? (
            <p className="empty-state">No expenses yet. Add your first expense!</p>
          ) : (
            recent.map((expense) => (
              <div key={expense.id} className="recent-item">
                <div className="recent-info">
                  <p className="recent-desc">{expense.description || 'No description'}</p>
                  <p className="recent-category">{expense.category_name || 'Uncategorized'}</p>
                </div>
                <div className="recent-right">
                  <p className="recent-amount">${parseFloat(expense.amount as any).toFixed(2)}</p>
                  <p className="recent-date">{format(new Date(expense.date), 'MMM dd')}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
