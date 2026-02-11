import pool from '../config/database';

const setupDatabase = async () => {
  const client = await pool.connect();
  
  try {
    console.log('🔧 Setting up database schema...');

    // Create users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created');

    // Create categories table
    await client.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        name VARCHAR(100) NOT NULL,
        color VARCHAR(7),
        icon VARCHAR(50),
        is_system BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, name)
      );
    `);
    console.log('✅ Categories table created');

    // Create expenses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS expenses (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
        amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
        description TEXT,
        date DATE NOT NULL,
        payment_method VARCHAR(50),
        tags TEXT[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Expenses table created');

    // Create indexes
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_expenses_user_date 
      ON expenses(user_id, date DESC);
    `);
    
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_expenses_category 
      ON expenses(category_id);
    `);
    console.log('✅ Indexes created');

    // Insert default user (for development)
    await client.query(`
      INSERT INTO users (id, email, name)
      VALUES (1, 'demo@example.com', 'Demo User')
      ON CONFLICT (id) DO NOTHING;
    `);
    console.log('✅ Default user created');

    // Insert default categories
    const defaultCategories = [
      { name: 'Food & Dining', color: '#FF6B6B', icon: '🍽️', is_system: true },
      { name: 'Transportation', color: '#4ECDC4', icon: '🚗', is_system: true },
      { name: 'Shopping', color: '#45B7D1', icon: '🛍️', is_system: true },
      { name: 'Entertainment', color: '#FFA07A', icon: '🎬', is_system: true },
      { name: 'Bills & Utilities', color: '#98D8C8', icon: '💡', is_system: true },
      { name: 'Health & Fitness', color: '#F7DC6F', icon: '💪', is_system: true },
      { name: 'Other', color: '#95A5A6', icon: '📌', is_system: true }
    ];

    for (const cat of defaultCategories) {
      await client.query(`
        INSERT INTO categories (user_id, name, color, icon, is_system)
        VALUES (1, $1, $2, $3, $4)
        ON CONFLICT (user_id, name) DO NOTHING;
      `, [cat.name, cat.color, cat.icon, cat.is_system]);
    }
    console.log('✅ Default categories created');

    console.log('🎉 Database setup complete!');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
};

setupDatabase();
