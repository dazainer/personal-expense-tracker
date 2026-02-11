import { useState } from 'react';
import {
  useExpenses,
  useCategories,
  useCreateExpense,
  useDeleteExpense,
  useUpdateExpense,
} from '@/hooks/useData';
import { CreateExpenseInput, Expense } from '@/types';
import { format } from 'date-fns';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

export default function Expenses() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  
  const { data: expenses, isLoading } = useExpenses();
  const { data: categories } = useCategories();
  const createExpense = useCreateExpense();
  const deleteExpense = useDeleteExpense();
  const updateExpense = useUpdateExpense();

  const [formData, setFormData] = useState<CreateExpenseInput>({
    amount: 0,
    category_id: undefined,
    description: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    payment_method: 'credit',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingExpense) {
      await updateExpense.mutateAsync({
        id: editingExpense.id,
        input: formData,
      });
    } else {
      await createExpense.mutateAsync(formData);
    }
    
    resetForm();
  };

  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setFormData({
      amount: parseFloat(expense.amount as any),
      category_id: expense.category_id || undefined,
      description: expense.description || '',
      date: expense.date,
      payment_method: expense.payment_method || 'credit',
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      await deleteExpense.mutateAsync(id);
    }
  };

  const resetForm = () => {
    setFormData({
      amount: 0,
      category_id: undefined,
      description: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      payment_method: 'credit',
    });
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading expenses...</p>
      </div>
    );
  }

  return (
    <div className="expenses-page">
      <div className="page-header">
        <h1>Expenses</h1>
        <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
          <Plus size={20} />
          Add Expense
        </button>
      </div>

      {isFormOpen && (
        <div className="modal-overlay" onClick={resetForm}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingExpense ? 'Edit Expense' : 'Add New Expense'}</h2>
              <button className="icon-btn" onClick={resetForm}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="expense-form">
              <div className="form-group">
                <label>Amount *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: parseFloat(e.target.value) })
                  }
                  required
                  placeholder="0.00"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select
                  value={formData.category_id || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category_id: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                >
                  <option value="">Select category</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="What did you buy?"
                />
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <select
                  value={formData.payment_method || 'credit'}
                  onChange={(e) =>
                    setFormData({ ...formData, payment_method: e.target.value })
                  }
                >
                  <option value="cash">Cash</option>
                  <option value="credit">Credit Card</option>
                  <option value="debit">Debit Card</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-secondary" onClick={resetForm}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingExpense ? 'Update' : 'Add'} Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="expenses-table-container">
        {!expenses || expenses.length === 0 ? (
          <div className="empty-state">
            <p>No expenses yet</p>
            <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
              Add Your First Expense
            </button>
          </div>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{format(new Date(expense.date), 'MMM dd, yyyy')}</td>
                  <td>{expense.description || 'No description'}</td>
                  <td>
                    <span className="category-badge">
                      {expense.category_name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="amount">${parseFloat(expense.amount as any).toFixed(2)}</td>
                  <td>{expense.payment_method || 'N/A'}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="icon-btn"
                        onClick={() => handleEdit(expense)}
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="icon-btn delete"
                        onClick={() => handleDelete(expense.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
