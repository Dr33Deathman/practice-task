import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import userService from '../services/user.service';

class UserController {
  async updateBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId, amount } = req.body;
      const user = await userService.updateBalance(Number(userId), Number(amount));
      
      return res.status(StatusCodes.OK).json({
        success: true,
        data: {
          id: user.id,
          balance: user.balance
        }
      });
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = parseInt(req.params.id);
      const user = await userService.getUser(userId);
      
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: 'User not found'
        });
      }
      
      return res.status(StatusCodes.OK).json({
        success: true,
        data: {
          id: user.id,
          balance: user.balance
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
