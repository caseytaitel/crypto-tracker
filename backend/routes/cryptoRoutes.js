const express = require('express');
const router = express.Router();

const {
  getAll,
  getHistory,
  getOne
} = require('../controllers/cryptoController');

// GET /api/crypto
router.get('/', getAll);

// GET /api/crypto/:id/history
router.get('/:id/history', getHistory);

// GET /api/crypto/:id (optional detail view)
router.get('/:id', getOne);

module.exports = router;
