import { Router, Request, Response } from 'express';
import { AnalyticsService } from '../services/analyticsService';

const router = Router();
const analyticsService = new AnalyticsService();

// GET /api/analytics/summary - Get spending summary
router.get('/summary', async (req: Request, res: Response) => {
  try {
    const startDate = req.query.startDate as string | undefined;
    const endDate = req.query.endDate as string | undefined;

    const summary = await analyticsService.getSummary(startDate, endDate);
    res.json({ success: true, summary });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch summary' });
  }
});

// GET /api/analytics/trends - Get spending trends
router.get('/trends', async (req: Request, res: Response) => {
  try {
    const days = req.query.days ? parseInt(req.query.days as string) : 30;
    const trends = await analyticsService.getTrends(days);
    
    res.json({ success: true, trends });
  } catch (error) {
    console.error('Error fetching trends:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch trends' });
  }
});

// GET /api/analytics/category-trends/:categoryId - Get category-specific trends
router.get('/category-trends/:categoryId', async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const days = req.query.days ? parseInt(req.query.days as string) : 30;
    
    const trends = await analyticsService.getCategoryTrends(categoryId, days);
    res.json({ success: true, trends });
  } catch (error) {
    console.error('Error fetching category trends:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch category trends' });
  }
});

export default router;
