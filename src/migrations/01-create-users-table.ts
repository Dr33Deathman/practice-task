import { DataTypes, QueryInterface } from 'sequelize';
import { Migration } from './umzug';

export const up: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  // add initial user with balance
  await queryInterface.bulkInsert('users', [{
    balance: 10000,
    createdAt: new Date(),
    updatedAt: new Date()
  }]);
};

export const down: Migration = async ({ context: queryInterface }: { context: QueryInterface }) => {
  await queryInterface.dropTable('users');
};
