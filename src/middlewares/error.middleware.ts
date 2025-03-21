import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Internal Server Error';
  
  if (err.message === 'User not found') {
    statusCode = StatusCodes.NOT_FOUND;
    message = err.message;
  } else if (err.message === 'Insufficient balance') {
    statusCode = StatusCodes.BAD_REQUEST;
    message = err.message;
  }
  
  res.status(statusCode).json({
    success: false,
    message
  });
};
