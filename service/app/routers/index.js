import bookRouter from './book-router.js';
import authorRouter from './author-router.js';
import userRouter from './user-router.js';
import orderRouter from './order-router.js';
import paymentRouter from './payment-router.js';
import reviewRouter from './review-router.js';
import recommendationRouter from './recommendation-router.js';;
import authRouter from './auth-router.js';

// Initialize routes
const initRoutes = (app) => {
    app.use('/books', bookRouter)
        .use('/authors', authorRouter)
        .use('/users', userRouter)
        .use('/orders', orderRouter)
        .use('/reviews', reviewRouter)
        .use('/payments', paymentRouter)
        .use('/recommendations', recommendationRouter)
        .use('/auth', authRouter);

}

export default initRoutes;