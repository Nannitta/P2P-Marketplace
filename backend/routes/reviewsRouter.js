const express = require('express');
const reviewsRouter = express.Router();
const authUser = require('../middlewares/authUser');

const getUserReviews = require('../controllers/ratings/getUserReviews');
const addUserReview = require('../controllers/ratings/addUserReview');

reviewsRouter.get('/:idUser', getUserReviews);
reviewsRouter.post('/:orderId', authUser, addUserReview);

module.exports = reviewsRouter;
