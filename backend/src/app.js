const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/auth.routes');
const transactionRoutes = require('../routes/transaction.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

module.exports = app;