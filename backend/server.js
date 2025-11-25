const express = require('express');
const cors = require('cors');
const cryptoRoutes = require('./routes/cryptoRoutes');
const errorHandler = require('./errors/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/crypto', cryptoRoutes);

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
