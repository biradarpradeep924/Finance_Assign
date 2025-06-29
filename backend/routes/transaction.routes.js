const express = require('express');
const { verifyToken } = require('../middleware/auth');
const Transaction = require('../models/transaction.model');
const { exportToCSV } = require('../utils/csvExporter');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  try {
    const filters = req.query;
    const data = await Transaction.find(filters);
    res.json(data);
  } catch (err) {
    console.error('Transaction fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/export', verifyToken, async (req, res) => {
  try {
    console.log('Export request body:', req.body);
    const { fields } = req.body;
    const transactions = await Transaction.find({});
    const filePath = path.join(__dirname, '../exports/transactions.csv');
    await exportToCSV(transactions, fields, filePath);
    res.download(filePath, 'transactions.csv', () => {
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ message: 'Failed to export data' });
  }
});


module.exports = router;
