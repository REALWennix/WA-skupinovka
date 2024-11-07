const QRCode = require('qrcode');
const moment = require('moment');
const db = require('../config/db');

function generateQRCode(userId, callback) {
  const expiration = moment().add(10, 'minutes').toISOString();
  const token = `${userId}:${expiration}`;

  QRCode.toDataURL(token, (err, qrCodeData) => {
    if (err) {
      return callback(err);
    }

    db.run(
      `INSERT INTO qrcodes (user_id, url, expiration) VALUES (?, ?, ?)`,
      [userId, qrCodeData, expiration],
      function (err) {
        if (err) {
          return callback(err);
        }

        callback(null, { id: this.lastID, qrCodeData });
      }
    );
  });
}

function validateQRCode(qrCodeUrl, callback) {
  db.get(
    `SELECT * FROM qrcodes WHERE url = ?`,
    [qrCodeUrl],
    (err, row) => {
      if (err) {
        return callback(err);
      }
      if (!row) {
        return callback(new Error('QR Code not found'));
      }

      const expiration = moment(row.expiration);
      if (moment().isAfter(expiration)) {
        return callback(new Error('QR Code expired'));
      }

      callback(null, row.user_id);
    }
  );
}

module.exports = {
  generateQRCode,
  validateQRCode
};
