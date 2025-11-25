const cryptoService = require('../services/cryptoService');
const AppError = require('../errors/AppError');

exports.getAll = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const data = await cryptoService.getCryptoList(Number(limit) || 25);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError('Coin ID is required.', 400);

    const data = await cryptoService.getCryptoHistory(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new AppError('Coin ID is required.', 400);

    const data = await cryptoService.getCryptoById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
