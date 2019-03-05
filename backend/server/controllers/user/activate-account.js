'use strict';

const userModel = require('../../../db/models/user-model');

async function activate(req, res) {
  const { verificationCode } = req.query;

  if (!verificationCode) {
    return res.status(400).json({
      message: 'Invalid verification code',
      target: 'verificationCode',
    });
  }

  try {
    const { foundUsers, activatedUsers } = await userModel.activateAccount(verificationCode);

    if (activatedUsers === 1) {
      return res.send('Account successfully activated');
    }

    if (foundUsers === 1) {
      return res.send('Account already activated');
    }

    return res.status(404).send('Verification code invalid');
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

module.exports = activate;
