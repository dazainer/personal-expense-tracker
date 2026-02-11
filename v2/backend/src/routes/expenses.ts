import { Router, Request, Response } from 'express';
import { ExpenseService } from '../services/expenseService';
import { CreateExpenseInput, UpdateExpenseInput, ExpenseFilters } from '../types';

const router = Router();
const expenseService = new ExpenseService();

// GET /api/expenses - Get all expenses with optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const filters: ExpenseFilters = {
      startDate: req.query.startDate as string,
      endDate: req.query.endDate as string,
      categoryId: req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined,
      minAmount: req.query.minAmount ? parseFloat(req.query.minAmount as string) : undefined,
      maxAmount: req.query.maxAmount ? parseFloat(req.query.maxAmount as string) : undefined,
    };

    const expenses = await expenseService.getAllExpenses(filters);
    res.json({ success: true, expenses });
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch expenses' });
  }
});

// GET /api/expenses/:id - Get single expense
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const expense = await expenseService.getExpenseById(id);
    
    if (!expense) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    res.json({ success: true, expense });
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch expense' });
  }
});

// POST /api/expenses - Create new expense
router.post('/', async (req: Request, res: Response) => {
  try {
    const input: CreateExpenseInput = req.body;

    // Validation
    if (!input.amount || input.amount <= 0) {
      return res.status(400).json({ success: false, error: 'Amount must be greater than 0' });
    }

    if (!input.date) {
      return res.status(400).json({ success: false, error: 'Date is required' });
    }

    const expense = await expenseService.createExpense(input);
    res.status(201).json({ success: true, expense });
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ success: false, error: 'Failed to create expense' });
  }
});

// PUT /api/expenses/:id - Update expense
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const input: UpdateExpenseInput = req.body;

    const expense = await expenseService.updateExpense(id, input);
    
    if (!expense) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    res.json({ success: true, expense });
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ success: false, error: 'Failed to update expense' });
  }
});

// DELETE /api/expenses/:id - Delete expense
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const success = await expenseService.deleteExpense(id);
    
    if (!success) {
      return res.status(404).json({ success: false, error: 'Expense not found' });
    }

    res.json({ success: true, message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ success: false, error: 'Failed to delete expense' });
  }
});

export default router;
