import express from 'express';
import Sleep from '../models/Sleep.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const logs = await Sleep.find({ user: req.user.id }).sort({ sleepTime: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { sleepTime, wakeTime, quality, notes } = req.body;
    const log = await Sleep.create({ user: req.user.id, sleepTime, wakeTime, quality, notes });
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const log = await Sleep.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!log) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
