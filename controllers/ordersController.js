const mongoose = require('mongoose');
const Order = require('../models/ordersModel');


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrdersById = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if (order == null) {
        return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng' });
      }
      res.json(order);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

const createOrder = async (req, res) => {
    const order = new Order({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      content: req.body.content
    });
    try {
      const newOrder = await order.save();
      res.status(201).json(newOrder);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

const deleteOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order == null) {
        return res.status(404).json({ message: 'Không tìm thấy đơn đặt hàng' });
        }
        await order.remove();
        res.json({ message: 'Xóa đơn đặt hàng thành công' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  
  
module.exports = {
    getAllOrders,
    createOrder,
    getOrdersById,
    deleteOrderById
  };