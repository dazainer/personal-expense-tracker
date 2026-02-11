import pool from '../config/database';
import { Category } from '../types';

export class CategoryService {
  private userId: number = 1;

  async getAllCategories(): Promise<Category[]> {
    const result = await pool.query(
      `SELECT * FROM categories 
       WHERE user_id = $1 
       ORDER BY is_system DESC, name ASC`,
      [this.userId]
    );

    return result.rows;
  }

  async getCategoryById(id: number): Promise<Category | null> {
    const result = await pool.query(
      'SELECT * FROM categories WHERE id = $1 AND user_id = $2',
      [id, this.userId]
    );

    return result.rows[0] || null;
  }

  async createCategory(name: string, color?: string, icon?: string): Promise<Category> {
    const result = await pool.query(
      `INSERT INTO categories (user_id, name, color, icon, is_system)
       VALUES ($1, $2, $3, $4, false)
       RETURNING *`,
      [this.userId, name, color || null, icon || null]
    );

    return result.rows[0];
  }

  async updateCategory(id: number, name?: string, color?: string, icon?: string): Promise<Category | null> {
    const updates: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex}`);
      params.push(name);
      paramIndex++;
    }

    if (color !== undefined) {
      updates.push(`color = $${paramIndex}`);
      params.push(color);
      paramIndex++;
    }

    if (icon !== undefined) {
      updates.push(`icon = $${paramIndex}`);
      params.push(icon);
      paramIndex++;
    }

    if (updates.length === 0) {
      return this.getCategoryById(id);
    }

    params.push(id);
    params.push(this.userId);

    const query = `
      UPDATE categories 
      SET ${updates.join(', ')}
      WHERE id = $${paramIndex} AND user_id = $${paramIndex + 1} AND is_system = false
      RETURNING *
    `;

    const result = await pool.query(query, params);
    return result.rows[0] || null;
  }

  async deleteCategory(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM categories WHERE id = $1 AND user_id = $2 AND is_system = false',
      [id, this.userId]
    );

    return result.rowCount !== null && result.rowCount > 0;
  }
}
