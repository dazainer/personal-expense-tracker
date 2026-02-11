import pool from '../config/database';
import { 
  Expense, 
  CreateExpenseInput, 
  UpdateExpenseInput, 
  ExpenseFilters 
} from '../types';

export class ExpenseService {
  private userId: number = 1; // Hardcoded for now

  async getAllExpenses(filters: ExpenseFilters = {}): Promise<Expense[]> {
    let query = `
      SELECT e.*, c.name as category_name 
      FROM expenses e
      LEFT JOIN categories c ON e.category_id = c.id
      WHERE e.user_id = $1
    `;
    
    const params: any[] = [this.userId];
    let paramIndex = 2;

    // Apply filters
    if (filters.startDate) {
      query += ` AND e.date >= $${paramIndex}`;
      params.push(filters.startDate);
      paramIndex++;
    }

    if (filters.endDate) {
      query += ` AND e.date <= $${paramIndex}`;
      params.push(filters.endDate);
      paramIndex++;
    }

    if (filters.categoryId) {
      query += ` AND e.category_id = $${paramIndex}`;
      params.push(filters.categoryId);
      paramIndex++;
    }

    if (filters.minAmount) {
      query += ` AND e.amount >= $${paramIndex}`;
      params.push(filters.minAmount);
      paramIndex++;
    }

    if (filters.maxAmount) {
      query += ` AND e.amount <= $${paramIndex}`;
      params.push(filters.maxAmount);
      paramIndex++;
    }

    query += ' ORDER BY e.date DESC, e.created_at DESC';

    const result = await pool.query(query, params);
    return result.rows;
  }

  async getExpenseById(id: number): Promise<Expense | null> {
    const result = await pool.query(
      `SELECT e.*, c.name as category_name 
       FROM expenses e
       LEFT JOIN categories c ON e.category_id = c.id
       WHERE e.id = $1 AND e.user_id = $2`,
      [id, this.userId]
    );
    
    return result.rows[0] || null;
  }

  async createExpense(input: CreateExpenseInput): Promise<Expense> {
    const result = await pool.query(
      `INSERT INTO expenses (user_id, amount, category_id, description, date, payment_method, tags)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        this.userId,
        input.amount,
        input.category_id || null,
        input.description || null,
        input.date,
        input.payment_method || null,
        input.tags || null
      ]
    );

    return result.rows[0];
  }

  async updateExpense(id: number, input: UpdateExpenseInput): Promise<Expense | null> {
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (input.amount !== undefined) {
      updates.push(`amount = $${paramIndex}`);
      params.push(input.amount);
      paramIndex++;
    }

    if (input.category_id !== undefined) {
      updates.push(`category_id = $${paramIndex}`);
      params.push(input.category_id);
      paramIndex++;
    }

    if (input.description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      params.push(input.description);
      paramIndex++;
    }

    if (input.date !== undefined) {
      updates.push(`date = $${paramIndex}`);
      params.push(input.date);
      paramIndex++;
    }

    if (input.payment_method !== undefined) {
      updates.push(`payment_method = $${paramIndex}`);
      params.push(input.payment_method);
      paramIndex++;
    }

    if (input.tags !== undefined) {
      updates.push(`tags = $${paramIndex}`);
      params.push(input.tags);
      paramIndex++;
    }

    if (updates.length === 0) {
      return this.getExpenseById(id);
    }

    updates.push(`updated_at = CURRENT_TIMESTAMP`);

    params.push(id);
    params.push(this.userId);

    const query = `
      UPDATE expenses 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1}
      RETURNING *
    `;

    const result = await pool.query(query, params);
    return result.rows[0] || null;
  }

  async deleteExpense(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM expenses WHERE id = $1 AND user_id = $2',
      [id, this.userId]
    );

    return result.rowCount !== null && result.rowCount > 0;
  }
}
