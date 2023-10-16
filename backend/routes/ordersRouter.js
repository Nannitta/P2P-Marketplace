const express = require('express');
const orderRouter = express.Router();
const authUser = require('../middlewares/authUser');

const addOrder = require('../controllers/orders/addOrder');
const getUserOrder = require('../controllers/orders/getUserOrder');
const confirmOrder = require('../controllers/orders/confirmOrder');
const rejectOrder = require('../controllers/orders/rejectOrder');
const getAllUserOrders = require('../controllers/orders/getAllUserOrders');

orderRouter.post('/user/:idProduct', authUser, addOrder);
orderRouter.get('/:idOrder?', authUser, getUserOrder);
orderRouter.get('/user/:idUser', authUser, getAllUserOrders);
orderRouter.put('/confirm/:idOrder', authUser, confirmOrder);
orderRouter.put('/reject/:idOrder', authUser, rejectOrder);

module.exports = orderRouter;
