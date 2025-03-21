import { Transaction } from 'sequelize';
import User from '../models/user.model';
import sequelize from '../utils/database';

class UserService {
  async updateBalance(userId: number, amount: number): Promise<User> {
    const transaction = await sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.SERIALIZABLE
    });

    try {
      const user = await User.findByPk(userId, { 
        lock: transaction.LOCK.UPDATE,
        transaction
      });

      if (!user) {
        await transaction.rollback();
        throw new Error('User not found');
      }

      const newBalance = parseFloat(user.balance.toString()) + amount;
      
      if (newBalance < 0) {
        await transaction.rollback();
        throw new Error('Insufficient balance');
      }

      user.balance = newBalance;
      await user.save({ transaction });
      
      await transaction.commit();
      
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async getUser(userId: number): Promise<User | null> {
    return User.findByPk(userId);
  }
}

export default new UserService();
