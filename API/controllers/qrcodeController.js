const qrcodeService = require("../services/qrcodeService");

async function generateQRCode(req, res) {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    qrcodeService.generateQRCode(userId, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error generating QR code" });
      }

      res.status(201).json({
        message: "QR code generated successfully",
        qrCodeData: result.qrCodeData,
      });
    });
  } catch (err) {
    res.status(500).json({ error: "Unexpected error generating QR code" });
  }
}

async function validateQRCode(req, res) {
  const { qrCodeUrl } = req.body;

  if (!qrCodeUrl) {
    return res.status(400).json({ error: "QR Code URL is required" });
  }

  try {
    qrcodeService.validateQRCode(qrCodeUrl, (err, userId) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      res.json({ message: "QR code validated successfully", userId });
    });
  } catch (err) {
    res.status(500).json({ error: "Unexpected error validating QR code" });
  }
}

module.exports = {
  generateQRCode,
  validateQRCode,
};
