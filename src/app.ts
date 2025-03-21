import express from 'express';
import { updateBalanceValidation } from './validators/user.validator';
import { validate } from './middlewares/validation.middleware';
import { errorHandler } from './middlewares/error.middleware';
import userController from './controllers/user.controller';

const app = express();

app.use(express.json());

app.post('/api/users/balance', updateBalanceValidation, validate, userController.updateBalance);
app.get('/api/users/:id', userController.getUser);

app.use(errorHandler);

export default app;
