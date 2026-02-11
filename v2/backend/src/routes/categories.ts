import { Router, Request, Response } from 'express';
import { CategoryService } from '../services/categoryService';

const router = Router();
const categoryService = new CategoryService();

// GET /api/categories - Get all categories
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json({ success: true, categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch categories' });
  }
});

// GET /api/categories/:id - Get single category
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const category = await categoryService.getCategoryById(id);
    
    if (!category) {
      return res.status(404).json({ success: false, error: 'Category not found' });
    }

    res.json({ success: true, category });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch category' });
  }
});

// POST /api/categories - Create new category
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, color, icon } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Category name is required' });
    }

    const category = await categoryService.createCategory(name, color, icon);
    res.status(201).json({ success: true, category });
  } catch (error: any) {
    console.error('Error creating category:', error);
    
    // Handle duplicate category name
    if (error.code === '23505') {
      return res.status(409).json({ success: false, error: 'Category name already exists' });
    }
    
    res.status(500).json({ success: false, error: 'Failed to create category' });
  }
});

// PUT /api/categories/:id - Update category
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, color, icon } = req.body;

    const category = await categoryService.updateCategory(id, name, color, icon);
    
    if (!category) {
      return res.status(404).json({ 
        success: false, 
        error: 'Category not found or is a system category' 
      });
    }

    res.json({ success: true, category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ success: false, error: 'Failed to update category' });
  }
});

// DELETE /api/categories/:id - Delete category
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const success = await categoryService.deleteCategory(id);
    
    if (!success) {
      return res.status(404).json({ 
        success: false, 
        error: 'Category not found or is a system category' 
      });
    }

    res.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ success: false, error: 'Failed to delete category' });
  }
});

export default router;
