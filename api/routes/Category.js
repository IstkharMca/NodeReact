const express = require('express');
// const Constant  = require('../utils/Constants/Constant.js');
const CategoryController = require('../controllers/CategoryController');

const router = express.Router();


router.get('/',CategoryController.getAllCategory);
router.post('/createCategory',CategoryController.createCategory);
router.delete('/:categoryId', CategoryController.deleteCategory);
router.get('/deleteAllCategory',CategoryController.deleteAllCategory);

module.exports = router

