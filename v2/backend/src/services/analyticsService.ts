import pool from '../config/database';
import { AnalyticsSummary, CategoryBreakdown, TrendData } from '../types';

export class AnalyticsService {
  private userId: number = 1;

  async getSummary(startDate?: string, endDate?: string): Promise<AnalyticsSummary> {
    let dateFilter = 'WHERE e.user_id = $1';
    const params: any[] = [this.userId];
    let paramIndex = 2;

    if (startDate) {
      dateFilter += ` AND e.date >= $${paramIndex}`;
      params.push(startDate);
      paramIndex++;
    }

    if (endDate) {
      dateFilter += ` AND e.date <= $${paramIndex}`;
      params.push(endDate);
      paramIndex++;
    }

    // Get total spent
    const totalResult = await pool.query(
      `SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
       FROM expenses e
       ${dateFilter}`,
      params
    );

    // Get category breakdown
    const categoryResult = await pool.query(
      `SELECT 
        e.category_id,
        COALESCE(c.name, 'Uncategorized') as category_name,
        SUM(e.amount) as amount,
        COUNT(*) as count
       FROM expenses e
       LEFT JOIN categories c ON e.category_id = c.id
       ${dateFilter}
       GROUP BY e.category_id, c.name
       ORDER BY amount DESC`,
      params
    );

    const totalSpent = parseFloat(totalResult.rows[0].total);
    const expenseCount = parseInt(totalResult.rows[0].count);

    const categoryBreakdown: CategoryBreakdown[] = categoryResult.rows.map(row => ({
      categoryId: row.category_id,
      categoryName: row.category_name,
      amount: parseFloat(row.amount),
      percentage: totalSpent > 0 ? (parseFloat(row.amount) / totalSpent) * 100 : 0,
      count: parseInt(row.count)
    }));

    // Calculate daily average
    const dateRangeResult = await pool.query(
      `SELECT MIN(date) as start_date, MAX(date) as end_date
       FROM expenses e
       ${dateFilter}`,
      params
    );

    let dailyAverage = 0;
    if (dateRangeResult.rows[0].start_date && dateRangeResult.rows[0].end_date) {
      const start = new Date(dateRangeResult.rows[0].start_date);
      const end = new Date(dateRangeResult.rows[0].end_date);
      const daysDiff = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1);
      dailyAverage = totalSpent / daysDiff;
    }

    return {
      totalSpent,
      categoryBreakdown,
      dailyAverage,
      expenseCount,
      dateRange: {
        start: startDate || dateRangeResult.rows[0].start_date || '',
        end: endDate || dateRangeResult.rows[0].end_date || ''
      }
    };
  }

  async getTrends(days: number = 30): Promise<TrendData[]> {
    const result = await pool.query(
      `SELECT 
        date,
        SUM(amount) as amount
       FROM expenses
       WHERE user_id = $1 
         AND date >= CURRENT_DATE - INTERVAL '${days} days'
       GROUP BY date
       ORDER BY date ASC`,
      [this.userId]
    );

    return result.rows.map(row => ({
      date: row.date,
      amount: parseFloat(row.amount)
    }));
  }

  async getCategoryTrends(categoryId: number, days: number = 30): Promise<TrendData[]> {
    const result = await pool.query(
      `SELECT 
        date,
        SUM(amount) as amount
       FROM expenses
       WHERE user_id = $1 
         AND category_id = $2
         AND date >= CURRENT_DATE - INTERVAL '${days} days'
       GROUP BY date
       ORDER BY date ASC`,
      [this.userId, categoryId]
    );

    return result.rows.map(row => ({
      date: row.date,
      amount: parseFloat(row.amount)
    }));
  }
}
