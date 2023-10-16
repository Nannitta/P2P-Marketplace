const express = require('express');
const getAllProducts = require('../controllers/products/getAllProducts');
const addProduct = require('../controllers/products/addProduct');
const getProduct = require('../controllers/products/getProduct');
const authUser = require('../middlewares/authUser');

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts);
productsRouter.post('/addProduct', authUser, addProduct);
productsRouter.get('/:idProduct', getProduct);

module.exports = productsRouter;
