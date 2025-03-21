import { check } from 'express-validator';

export const updateBalanceValidation = [
  check('userId')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  
  check('amount')
    .isNumeric()
    .withMessage('Amount must be a number')
];
