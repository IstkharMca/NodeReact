const express = require('express');
// const Constant  = require('../utils/Constants/Constant.js');
const CartController = require('../controllers/CartController');

const router = express.Router();


router.get('/',CartController.getAllCart);
router.post('/create',CartController.addToCart);
router.delete('/:cartId', CartController.deleteCartById);
router.get('/user/:userId', CartController.getUserCartItem);

// router.get('/deleteAll',ProductController.deleteAllCategory);

module.exports = router

