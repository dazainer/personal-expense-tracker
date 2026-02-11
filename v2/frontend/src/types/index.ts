// Frontend types - matching backend schema

export interface Expense {
  id: number;
  user_id: number;
  category_id: number | null;
  amount: number;
  description: string | null;
  date: string;
  payment_method: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  category_name?: string; // Joined from categories table
}

export interface Category {
  id: number;
  user_id: number;
  name: string;
  color: string | null;
  icon: string | null;
  is_system: boolean;
  created_at: string;
}

export interface CreateExpenseInput {
  amount: number;
  category_id?: number;
  description?: string;
  date: string;
  payment_method?: string;
  tags?: string[];
}

export interface UpdateExpenseInput {
  amount?: number;
  category_id?: number;
  description?: string;
  date?: string;
  payment_method?: string;
  tags?: string[];
}

export interface AnalyticsSummary {
  totalSpent: number;
  categoryBreakdown: CategoryBreakdown[];
  dailyAverage: number;
  expenseCount: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface CategoryBreakdown {
  categoryId: number | null;
  categoryName: string;
  amount: number;
  percentage: number;
  count: number;
}

export interface TrendData {
  date: string;
  amount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
