import sqlite3

DB_NAME = "expenses.db"


def connect_db():
    """Connects to the SQLite database and returns the connection."""
    return sqlite3.connect(DB_NAME)


def create_table():
    """Creates the expenses table if it does not already exist."""
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL NOT NULL,
            category TEXT NOT NULL,
            date TEXT NOT NULL,
            note TEXT
        )
    """)

    conn.commit()
    conn.close()

def add_expense(amount, category, date, note):
    """Inserts a new expense into the database."""
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO expenses (amount, category, date, note)
        VALUES (?, ?, ?, ?)
    """, (amount, category, date, note))

    conn.commit()
    conn.close()

def get_all_expenses():
    """Returns all expenses from the database."""
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM expenses")
    results = cursor.fetchall()

    conn.close()
    return results


def delete_expense(expense_id):
    """Deletes an expense by its ID."""
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM expenses WHERE id = ?", (expense_id,))

    conn.commit()
    conn.close()

def get_total_by_category():
    """Returns total expenses grouped by category."""
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT category, SUM(amount)
        FROM expenses
        GROUP BY category
    """)

    results = cursor.fetchall()
    conn.close()
    return results

