import dotenv from 'dotenv';
dotenv.config();
import session from 'express-session';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sequelize from './config/dbConnection.js';
import userRouter from './routes/userRoutes.js';
import categoryRouter from './routes/cetegoryRoutes.js';
import serviceRouter from './routes/ServiceRoutes.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: 'your_secret_key', // Replace with a random string
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', serviceRouter);

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.statusCode).json({
    message: err.message,
  });
});

(async () => {
  try {
    await sequelize.sync({ alter: true }); // Sync all models
    console.log('Database synchronized successfully.');

    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error('Error synchronizing models with database:', error);
  }
})();

export default app;
