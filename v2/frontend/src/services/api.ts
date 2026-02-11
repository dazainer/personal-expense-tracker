import axios from 'axios';
import {
  Expense,
  Category,
  CreateExpenseInput,
  UpdateExpenseInput,
  AnalyticsSummary,
  TrendData,
} from '@/types';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Expenses API
export const expensesApi = {
  getAll: async (params?: {
    startDate?: string;
    endDate?: string;
    categoryId?: number;
    minAmount?: number;
    maxAmount?: number;
  }): Promise<Expense[]> => {
    const { data } = await api.get('/expenses', { params });
    return data.expenses;
  },

  getById: async (id: number): Promise<Expense> => {
    const { data } = await api.get(`/expenses/${id}`);
    return data.expense;
  },

  create: async (input: CreateExpenseInput): Promise<Expense> => {
    const { data } = await api.post('/expenses', input);
    return data.expense;
  },

  update: async (id: number, input: UpdateExpenseInput): Promise<Expense> => {
    const { data } = await api.put(`/expenses/${id}`, input);
    return data.expense;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/expenses/${id}`);
  },
};

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const { data } = await api.get('/categories');
    return data.categories;
  },

  create: async (input: {
    name: string;
    color?: string;
    icon?: string;
  }): Promise<Category> => {
    const { data } = await api.post('/categories', input);
    return data.category;
  },
};

// Analytics API
export const analyticsApi = {
  getSummary: async (params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<AnalyticsSummary> => {
    const { data } = await api.get('/analytics/summary', { params });
    return data.summary;
  },

  getTrends: async (days: number = 30): Promise<TrendData[]> => {
    const { data } = await api.get('/analytics/trends', { params: { days } });
    return data.trends;
  },

  getCategoryTrends: async (
    categoryId: number,
    days: number = 30
  ): Promise<TrendData[]> => {
    const { data } = await api.get(`/analytics/category-trends/${categoryId}`, {
      params: { days },
    });
    return data.trends;
  },
};

export default api;
