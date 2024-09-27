const express = require('express');
const authController = require('../controllers/authController.js');
const tpoController = require('../controllers/tpoController.js');

const router = express.Router();

router
  .route('/registerStudents')
  .post(authController.protect,authController.restrictTo('tpo'),tpoController.registerStudents);

router
  .route('/registerCompany')
  .post(authController.protect,authController.restrictTo('tpo'),tpoController.registerNewCompany);

router
  .route('/registerStudent')
  .post(authController.protect,authController.restrictTo('tpo'),tpoController.registerStudent);

module.exports=router;