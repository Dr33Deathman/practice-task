import dotenv from 'dotenv';
import app from './app';
import sequelize from './utils/database';
import { umzug } from './migrations/umzug';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    await umzug.up();
    console.log('Migrations executed successfully');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
