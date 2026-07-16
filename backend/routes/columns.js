import express from 'express';
import Column from '../models/Column.js';
import Task from '../models/Task.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Apply authMiddleware to all routes in this file
router.use(authMiddleware);

// GET /api/columns -> Fetch all columns for the logged-in user sorted by order ascending
router.get('/', async (req, res) => {
  try {
    const columns = await Column.find({ userId: req.user.userId }).sort({ order: 1 });
    res.json(columns);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching columns', error: error.message });
  }
});

// POST /api/columns -> Create a new column
router.post('/', async (req, res) => {
  try {
    const { title, color } = req.body;

    // Find the column with the highest order value for this user
    const lastColumn = await Column.findOne({ userId: req.user.userId })
      .sort({ order: -1 })
      .limit(1);

    // If a column exists, put the new one next in order; otherwise, start at 0
    const order = lastColumn ? lastColumn.order + 1 : 0;

    const newColumn = new Column({
      title,
      color,
      order,
      userId: req.user.userId,
    });

    const savedColumn = await newColumn.save();
    res.status(201).json(savedColumn);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating column', error: error.message });
  }
});

// PUT /api/columns/:id -> Update column title or color
router.put('/:id', async (req, res) => {
  try {
    const updatedColumn = await Column.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true } // Returns the updated document
    );

    if (!updatedColumn) {
      return res.status(404).json({ message: 'Column not found or unauthorized' });
    }

    res.json(updatedColumn);
  } catch (error) {
    res.status(500).json({ message: 'Server error updating column', error: error.message });
  }
});

// DELETE /api/columns/:id -> Delete a column and all its associated tasks
router.delete('/:id', async (req, res) => {
  try {
    const deletedColumn = await Column.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!deletedColumn) {
      return res.status(404).json({ message: 'Column not found or unauthorized' });
    }

    // Cascade delete: remove all tasks in this column
    await Task.deleteMany({ columnId: req.params.id });

    res.json({ message: 'Column and associated tasks deleted successfully', column: deletedColumn });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting column', error: error.message });
  }
});

export default router;