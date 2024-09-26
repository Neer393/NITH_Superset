const express = require('express');
const authController = require('../controllers/authController.js');

const router = express.Router();

router
  .route('/login')
  .post(authController.login);

  router
  .route('/forgotPassword')
  .post(authController.forgotPassword);

router
  .route('/resetPassword/:token')
  .patch(authController.resetPassword);

router
  .route('/updatePassword')
  .patch(authController.updatePassword);

module.exports=router;