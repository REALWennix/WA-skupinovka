const express = require('express');
const router = express.Router();
const qrcodeController = require('../controllers/qrcodeController');

router.post('/generate', qrcodeController.generateQRCode);

router.post('/validate', qrcodeController.validateQRCode);

module.exports = router;
