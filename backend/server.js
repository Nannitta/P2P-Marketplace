const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const { PORT } = require('./config');

const userRouter = require('./routes/userRouter');
const productsRouter = require('./routes/productRouter');
const ordersRouter = require('./routes/ordersRouter');
const reviewsRouter = require('./routes/reviewsRouter');

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(fileUpload());

app.use('/user', userRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/reviews', reviewsRouter);

app.use((err, req, res, next) => {
    console.error(err);

    const errorCode = err.statusCode ?? 500;

    res.status(errorCode).send({
        error: err.message
    });
});

app.use((req, res) => {
    res.status(404).send({
        message: '¡No encontrado!'
    });
});

app.listen(5002, () => {
    console.log(`Server listening at http://localhost:${PORT}...`);
});
