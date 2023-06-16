const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

router.post('/', ordersController.createOrder);
router.get('/', ordersController.getAllOrders);
router.get('/:id', ordersController.getOrdersById);
router.delete('/:id', ordersController.deleteOrderById);

module.exports = router;
