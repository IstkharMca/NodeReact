const express = require('express');
// const Constant  = require('../utils/Constants/Constant.js');
const ProductController = require('../controllers/ProductController');

const router = express.Router();


router.get('/',ProductController.getAllProduct);
router.post('/create',ProductController.createproduct);
router.delete('/:productId', ProductController.deleteProduct);
// router.get('/deleteAll',ProductController.deleteAllCategory);

module.exports = router

